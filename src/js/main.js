/*document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal'),
          modalBtn = document.querySelectorAll('[data-toggle="modal"]'),
          closeBtn = document.querySelector('.modal__close');

    
    const swithModal = () => {
        modal.classList.toggle('modal--visable');
    };
    
    modalBtn.forEach(item => {
        item.addEventListener('click', (event) => {
            if(event.target === item) {
                swithModal();
            }
        });
    });
    modal.addEventListener('click', (event)=> {
        const target = event.target;
        if(target === closeBtn) {
            swithModal();
        }
        if(target === modal) {
            swithModal();
        }
    });
    document.addEventListener('keydown', (event)=> {
        if(event.key === 'Escape') {
            modal.classList.remove('modal--visable'); 
        }
    });
});*/
//Обращение к документу
$(document).ready(function () {
    //модальное окно
    const modal = $('.modal'),
        modalBtn = $('[data-toggle="modal"]'),
        closeBtn = $('.modal__close');

    modalBtn.on('click', function () {
        modal.toggleClass('modal--visable');
    });
    closeBtn.on('click', function () {
        modal.toggleClass('modal--visable');
    });
    //Плавный скролл вверх
    const btn = $('#buttonUp');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 600) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });

    btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, '500');
    });
    //Инициализация слайдера
    const mySwiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
    //Отображение элементов управления слайдера на мобильном и декстоп разр
    const next = $('.swiper-button-next'),
          prev = $('.swiper-button-prev'),
          bullets = $('.swiper-pagination');

    if($(window).width() <= 375) {

        next.css('left', prev.width() + bullets.width());
        bullets.css('left', prev.width() -10);
    }else {
        next.css('left', prev.width() + 25 + bullets.width() + 20);
        bullets.css('left', prev.width() + 25);
    }
    //анимации
    new WOW().init();
    const animateItem = $('.video__play');
    $(window).scroll(function () {
        if ($(window).scrollTop() > 1172) {
            animateItem.addClass('video-anitated');
        }else {
            animateItem.removeClass('video-anitated');
        }
    });
    //Валидация форм
    const allForms = ['.modal__form', '.control__form', '.footer__form'];
    $.each(allForms, function (index, value){
        $(value).validate({
            errorClass: "invalid",
            errorElement: "div",
            rules: {
                userName: {
                    required: true,
                    minlength: 2,
                    maxlength: 15
                },
                userPhone: "required",
                userEmail: {
                  required: true,
                  email: true
                },
                userText: {
                  required: true,
                  minlength: 15,
                },
                userCheck: "required"
            },
            messages: {
                userName: {
                    required: "Имя обязательно",
                    minlength: "Имя не короче 2 букв",
                    maxlength: "Поле не может содеражть больше 15 символов"
                },
                userEmail: {
                  required: "Обязательно укажите email",
                  email: "Введите в формате: name@domain.com"
                },
                userText: {
                  required: "Поле вопрос обязательно",
                  minlength: "Не менее 15 символов",
                },
                userPhone: {
                  required: "Телефон обязателен"
                },
                userCheck: {
                    required: "Подтвердите согласие на обработку персональных данных"
                }
                
            },
            submitHandler: function(form) {
                $.ajax({
                    type: "POST",
                    url: "send.php",
                    data: $(form).serialize(),
                    success: function(response) {
                        $(form)[0].reset();
                        modal.removeClass('modal--visable');
                        const popUp = confirm('Спасибо за заявку мы свяжимся с вами! Хотите подписаться на нашу группу ?');
                        if(popUp){
                            window.location.href = 'https://vk.com/glo_academy';
                        }
                    }
                });
            }
        });
    });
    //маска номера телефона 
    $('[type=tel]').mask('+7(000)-000-00-00', {placeholder: "+7 (000) 000-00-00"});
    //Создание yandex map 
    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
                center: [47.244729, 39.723187],
                zoom: 15
            }, {
                searchControlProvider: 'yandex#search'
            }),
    
            // Создаём макет содержимого.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),
    
            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: 'Наш офис',
                balloonContent: 'Вход со двора'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: 'img/icon/map-marker.png',
                // Размеры метки.
                iconImageSize: [32, 32],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-5, -38]
            });

            myMap.geoObjects
            .add(myPlacemark);
    });
});
