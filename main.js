// Initialize EmailJS
(function () {
    emailjs.init('B17qsXr5wz0JGdzFF');
})();

window.addEventListener('load', () => {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const submitStatus = document.getElementById('submit-status');

        // trim leading/trailing whitespaces
        let userInputs = document.querySelectorAll('.user-input');
        userInputs.forEach(userInput => { userInput.value = userInput.value.trim(); });

        // check for empty fields
        if (this.user_name.value.length === 0
            || this.user_business.value.length === 0
            || this.user_email.value.length === 0
            || this.user_industry.value === 'none') {
            submitStatus.innerText = "Missing required field."
            submitStatus.style.color = 'red';
            resetSubmitStatus();
            return;
        }

        // display "Sending..."" message
        submitStatus.style.color = 'gray';

        emailjs.sendForm('aacolink_ac_contact', 'aacolink_ac_contact_form', this)
            .then(function () {
                submitStatus.innerText = "Successfully Sent!"
                submitStatus.style.color = 'green';
                resetSubmitStatus();

                // reset form fields
                userInputs.forEach(userInput => { userInput.value = ''; });
                this.user_industry.selectedIndex = 0;
            }, function (error) {
                submitStatus.innerText = "Something's wrong! Please try again."
                submitStatus.style.color = 'red';
                resetSubmitStatus();
            }
            );
    });
});

function resetSubmitStatus() {
    setTimeout(() => {
        const submitStatus = document.getElementById('submit-status');
        submitStatus.style.color = 'transparent';
        submitStatus.innerText = "Sending...";
    }, 3000);
}

window.addEventListener('DOMContentLoaded', () => {
    clickBurger();   // navbar menu dropdown click event
    scrollNav();     // display navbar when scroll down
    homeBtn();       // home button click event: scroll to top of page
    closeDropdown(); // automatic close dropdown menu on menu click

    const currYear = (new Date()).getFullYear();
    const copyright = `&copy; ${currYear} Aacolink`;
    document.getElementById('copyright-info').innerHTML = copyright;
});

function clickBurger() {
    let burger = document.getElementById('burger');
    burger.addEventListener('click', () => {
        let menu = document.querySelector('#menu');
        if (menu.classList.contains('dropdown')) {
            menu.classList.remove('dropdown');
            burger.innerHTML = '<svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"> <path d="M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z" /> </svg>';
        } else {
            menu.classList.add('dropdown');
            burger.innerHTML = '<svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z" /></svg>';
        }
    });
}

function scrollNav() {
    window.addEventListener('scroll', () => {
        if (window.scrollY === 0) {
            document.querySelector('nav').style = '';
        } else {
            const whiteBackground = 'background: white;';
            const boxShadow = 'box-shadow: 0 2px 5px gray';
            document.querySelector('nav').style = whiteBackground + boxShadow;
        }
    });
}

function homeBtn() {
    const logo = document.getElementById('logo');
    const navHomeBtn = document.getElementById('nav-home');
    const protocol = window.location.protocol;
    const host = window.location.host;
    const baseURl = protocol + '//' + host;

    function homeBehavior() {
        window.scrollTo(0, 0);
        history.pushState({}, '', baseURl);
    };

    logo.addEventListener('click', () => { homeBehavior(); });
    navHomeBtn.addEventListener('click', () => { homeBehavior(); });
}

function closeDropdown() {
    if (screen.width < 1024) {
        const navBtns = document.querySelectorAll('.menu-item');
        navBtns.forEach(navBtn => {
            navBtn.addEventListener('click', () => {
                document.getElementById('burger').click();
            });
        });
    }
}
