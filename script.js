document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelectorAll(".stat-number");

    const hamburger = document.getElementById("hambuger")
    const headerMenu = document.querySelector(".menus")
    const navMenu = document.querySelector(".menu")
    const navList = document.querySelectorAll(".nav-list")

    const toggleMenu = () => {
        hamburger.classList.toggle("active")
        headerMenu.classList.toggle("active")
        navMenu.classList.toggle("active")
    }
    hamburger.addEventListener("click", toggleMenu)
    navList.forEach(link => {
        link.addEventListener("click", () => {
            if (headerMenu.classList.contains("active")) {
                toggleMenu()
            }
        })

    })

    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            // Only trigger when the component scrolls onto the screen
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const targetValue = parseInt(targetElement.getAttribute("data-target"));
                let currentValue = 0;

                // Settings for smooth speed
                const duration = 1500; // Animation lasts 1.5 seconds
                const stepTime = Math.max(Math.floor(duration / targetValue), 10);

                const counterInterval = setInterval(() => {
                    currentValue += Math.ceil(targetValue / (duration / stepTime));

                    if (currentValue >= targetValue) {
                        currentValue = targetValue;
                        clearInterval(counterInterval);
                    }

                    // Formats the output based on Lumina Strategy's specs
                    if (targetValue === 150) {
                        targetElement.textContent = currentValue + "+";
                    } else if (targetValue === 12) {
                        targetElement.textContent = currentValue + "+";
                    } else if (targetValue === 340 || targetValue === 98) {
                        targetElement.textContent = currentValue + "%";
                    } else {
                        targetElement.textContent = currentValue;
                    }
                }, stepTime);

                // Stop observing this element once it has animated once
                observer.unobserve(targetElement);
            }
        });
    };

    const observerOptions = {
        threshold: 0.2 // Triggers when 20% of the element is visible
    };

    const statsObserver = new IntersectionObserver(animateCounters, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));
});