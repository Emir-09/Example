const tabContent = document.querySelectorAll('.tabcontent')
const tabs = document.querySelectorAll('.tabheader__item')
const tabsParent = document.querySelector('.tabheader__items')


const hideTabContent = () => {
    tabContent.forEach((item) => {
        item.style.display = "none"
    })
    tabs.forEach((item) => {
        item.classList.remove('tabheader__item_active')
    })
}

const showTabContent = (i = 0) => {
    tabContent[i].style.display = 'block'
    tabs[i].classList.add('tabheader__item_active')
}

hideTabContent()
showTabContent()


tabsParent.addEventListener('click', e => {
    const target = e.target

    if (target.classList.contains('tabheader__item')) {
        tabs.forEach((item, index) => {
            if (target === item) {
                hideTabContent()
                showTabContent(index)
            }
        })
    }
})

let autoSwitchInterval = null
let tabNumber = 0

const startAutoSwitch = () => {
    autoSwitchInterval = setInterval(() => {
        tabNumber++
        if (tabNumber >= tabs.length) {
            tabNumber = 0
        }
        hideTabContent()
        showTabContent(tabNumber)
    }, 2000)
}

const stopAutoSwitch = () => {
    clearInterval(autoSwitchInterval)
}

tabs.forEach((item, index) => {
    item.addEventListener('click', e => {
        const target = e.target
        stopAutoSwitch()
        setTimeout(startAutoSwitch, 6000)
        if (target === item) {
            tabNumber = index
        }
    })
})

startAutoSwitch()

const modal = document.querySelector('.modal')
const openModalBtn = document.querySelector('.btn_white')
const closeModalBtn = document.querySelector('.modal__close')

const openModal = () => {
    modal.classList.add('show')
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden'
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.classList.remove('show')
            modal.classList.add('hide')
            document.body.style.overflow = ''
        }
    })
}

openModalBtn.addEventListener('click', openModal)

const closeModal = () => {
    modal.classList.add('hide')
    modal.classList.remove('show')
    document.body.style.overflow = ''
}

closeModalBtn.addEventListener('click', closeModal)

window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        openModal()
    }
})

const forms = document.querySelectorAll('form')

const postData = (url, data) => {
    const request = fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application.json' },
        body: data
    })
}

const bindPostData = form => {
    form.addEventListener('submit', e => {
        e.preventDefault()
        const formData = new FormData(form)
        const obj = {}
        
        formData.forEach((item, name) => {
            obj[name] = item
        })
        console.log(obj);

        const json = JSON.stringify(obj)

        postData('server.php', json)
            .then((data) => data)
            .catch(e => console.error(e))
            .finally(() => console.warn("finally"))
    })
}

forms.forEach(item => {
    bindPostData(item)
})


class Menu {
    constructor(img, alt, title, descrp, price) {
        this.img = img
        this.alt = alt
        this.title = title
        this.descrp = descrp
        this.price = price
    }

    render() {
        const wrapper = document.querySelector('#cardWrapper')
        const elem = document.createElement('div')

        elem.innerHTML = `
            <div class="menu__item">
				<img src="${this.img}" alt="${this.alt}">
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descrp}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> com/день</div>
				</div>
			</div>
        `
        wrapper.append(elem)
    }
}

getMenu = async(url) => {
    const res = await fetch(url)
    return await res.json()
}

getMenu('db.json').then((data) => {
    data.menu.forEach(({img, alt, title, descr, price}) => {
        new Menu(img, alt, title, descr, price).render()
    })
})


const deadLine = '2024-08-16'


const getTime = (deadLine) => {
    const t = new Date(deadLine) - new Date()
    days = Math.floor(t / (1000 * 60 * 60 * 24))
    hours = Math.floor((t / (1000 * 60 * 60)) % 24)
    minutes = Math.floor((t / (1000 * 60)) % 60)
    seconds = Math.floor((t / 1000) % 60)
    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    } 
}

const setClock = (element, deadLine) => {
    const elem = document.querySelector(element)
    const days = elem.querySelector('#days')
    const hours = elem.querySelector('#hours')
    const minutes = elem.querySelector('#minutes')
    const seconds = elem.querySelector('#seconds')

    const updateClock = () => {
        const t = getTime(deadLine)
        days.innerHTML = t.days
        hours.innerHTML = t.hours
        minutes.innerHTML = t.minutes
        seconds.innerHTML = t.seconds
    }
    setInterval(updateClock, 1000)
}

setClock('.timer', deadLine)
