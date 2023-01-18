'use strict';

window.addEventListener('DOMContentLoaded', function(){

    //Header Tabs


    let tabs = document.querySelectorAll('.promo__item');
    let tabsParent = document.querySelector('.promo__items');

    function hideHeadersTabs() {

        tabs.forEach(item => {
            item.classList.remove('promo__item_active');
        })
    }

    function showHeaderTabs(i=0) {

        tabs[i].classList.add('promo__item_active');
    }

    
    showHeaderTabs();
    hideHeadersTabs();

    tabsParent.addEventListener('click', function(event) {
        const target = event.target;

        if(target && target.classList.contains('promo__item')) {
            tabs.forEach((item,i) => {
                if(target === item) {
                    hideHeadersTabs();
                    showHeaderTabs(i);
                }
            });
        }
    });

    // Slider

    let laptop = document.querySelectorAll('.request__photo');
    let pointe = document.querySelectorAll('.request__pointe');
    let pointeParent = document.querySelector('.request__pointBox');

    function hideSlide() {


        laptop.forEach(item => {

            item.classList.remove('request__photo_active');
            item.classList.remove('request__photo');
            item.classList.add('request__photo');
        })


        pointe.forEach(item => {

            item.classList.remove('request__pointe_active');
            item.classList.remove('request__pointe');
            item.classList.add('request__pointe');

        });
    }

    function showSlide(i=0) {

        laptop[i].classList.remove('request__photo');
        laptop[i].classList.add('request__photo_active');

        pointe[i].classList.remove('request__pointe');
        pointe[i].classList.add('request__pointe_active');
    }

    hideSlide();
    showSlide();

    pointeParent.addEventListener('click', function(event) {
        const target = event.target;

        if(target && target.classList.contains('request__pointe')) {
            pointe.forEach((item, i) => {
                if(target === item) {
                    hideSlide();
                    showSlide(i);
                }
            });
        }
    });

    //Price Slider

    let priceParent = document.querySelector('.price__wrapper');
    let priceBox = document.querySelectorAll('.price__box');
    let priceBoxTitle = document.querySelectorAll('.price__box__title');
    let priceBoxSum = document.querySelectorAll('.price__box__sum');
    let priceBoxMonth = document.querySelectorAll('.price__box__per_month');
    let priceBoxLine1 = document.querySelectorAll('.price__box__line-1');
    let priceBoxLine2 = document.querySelectorAll('.price__box__line-2');
    let priceBoxLine3 = document.querySelectorAll('.price__box__line-3');

    let priceBoxText1 = document.querySelectorAll('.price__box__text-1');
    let priceBoxText2 = document.querySelectorAll('.price__box__text-2');
    let priceBoxText3 = document.querySelectorAll('.price__box__text-3');


    
    function hidePrice() {

        priceBox.forEach(item => {
            item.classList.remove('price__box_active');
        });

        priceBoxTitle.forEach(item => {
            item.classList.remove('price__box__title_active');
        });

        priceBoxSum.forEach(item => {
            item.classList.remove('price__box__sum_active');
        });

        priceBoxMonth.forEach(item => {
            item.classList.remove('price__box__per_month_active');
        });

        priceBoxLine1.forEach(item => {
            item.classList.remove('price__box__line-1_active');
        });

        priceBoxLine2.forEach(item => {
            item.classList.remove('price__box__line-2_active');
        });

        priceBoxLine3.forEach(item => {
            item.classList.remove('price__box__line-3_active');
        });

        priceBoxText1.forEach(item => {
            item.classList.remove('price__box__text-1_active');
        });

        priceBoxText2.forEach(item => {
            item.classList.remove('price__box__text-2_active');
        });

        priceBoxText3.forEach(item => {
            item.classList.remove('price__box__text-3_active');
        });
    };

    function showPrice(i=1) {

        priceBox[i].classList.add('price__box_active');
        priceBoxTitle[i].classList.add('price__box__title_active');
        priceBoxSum[i].classList.add('price__box__sum_active');
        priceBoxMonth[i].classList.add('price__box__per_month_active');
        priceBoxLine1[i].classList.add('price__box__line-1_active');
        priceBoxLine2[i].classList.add('price__box__line-2_active');
        priceBoxLine3[i].classList.add('price__box__line-3_active');


        priceBoxText1[i].classList.add('price__box__text-1_active');
        priceBoxText2[i].classList.add('price__box__text-2_active');
        priceBoxText3[i].classList.add('price__box__text-3_active');
    }

    hidePrice();
    showPrice();



    priceParent.addEventListener('click', function(event) {
        const target = event.target;

        if(target && target.classList.contains('price__box')) {
            priceBox.forEach((item, i) => {
                if(target === item) {
                    hidePrice();
                    showPrice(i);
                }
            });
        }
    } )

    

    //acync await mit json-server

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'loading...',
        success: 'alles ok!',
        failure: 'Etwas schief gegangen'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                statusMessage.textContent = message.success;
                statusMessage.remove();
            }).catch (() => {
                statusMessage.textContent = message.failure;
            }).finally (() => {
                form.reset();
            });
        });
    }

// modal

    const modalTrigger = document.querySelectorAll('[data-modal]');
    const close = document.querySelector('[data-close]');

    const modal = document.querySelector('.modal');

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.style.display = "block";
        document.body.style.overflow = 'hidden';
    }

    close.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            closeModal();
        }
    });


    // class

    class HappyClient {
        constructor(src, alt, descr, name, stelle, parentSelctor, ...classes) {
            this.src = src;
            this.alt = alt;
            this.descr = descr;
            this.name = name;
            this.stelle = stelle;
            this.classes = classes;
            this.parent = document.querySelector(parentSelctor);
        }

        render() {
            const element = document.createElement('div');

            element.innerHTML = `
            <div class="client__box">
                <img src=${this.src} alt=${this.alt} class="client__img">
                <div class="client__text">
                    <div class="client__descr">${this.descr}</div>
                    <div class="client__name">
                        <div class="client__name-1">${this.name}</div>
                        <div class="client__name-2">${this.stelle}</div>
                    </div>
                </div>
            </div>
            `;
            this.parent.append(element);
        }
    }

    async function getResource(url) {
        let res = await fetch(url);
    
        return await res.json();
    }
    
    getResource('http://localhost:3000/clients')
    .then(data => {
        data.forEach(({src, alt, descr, name, stelle}) => {
            new HappyClient(src, alt, descr, name, stelle, ".client__wrapper").render();
        });
    });



});
