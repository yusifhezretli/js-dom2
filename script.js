let btn = document.querySelector("button")
let menu = document.querySelector("ul")

btn.addEventListener("click", function() {
    let inp = document.querySelector("input").value;
    menu.innerHTML +=` 
    <li>${inp} <i onclick="removetag(this)" class='bx bx-trash'></i></li> `
})


function removetag(element) {
    let itemToRemove = element.parentElement;
    itemToRemove.remove();
}

// sliders

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelector('.slides');
    // Slaydların ümumi sayını müəyyən edir
    const totalSlides = document.querySelectorAll('.slide').length;
    // currentSlide 0-a təyin edilib (birinci slayd).
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

// Slaydı göstərilən addımla irəli və ya geri hərəkət etdirir
function moveSlide(step) {
    showSlide(currentSlide + step);
}

function selectSlide(index) {
    showSlide(index);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);


    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener('mouseover', () => {
            const slideIndex = parseInt(thumbnail.getAttribute('data-slide'));
            selectSlide(slideIndex);
        });
    });
});



// portfoio

    document.addEventListener("DOMContentLoaded", function () {
        const filters = document.querySelectorAll('.blog_filters li');
        const items = document.querySelectorAll('.blog_item');

        filters.forEach(filter => {
            filter.addEventListener('click', function () {
               
                // filter_activeni bütün filtrlərdən silir.
                filters.forEach(f => f.classList.remove('filter_active'));
               
                // filter_activeni tıklanan filtrə əlavə edir.
                this.classList.add('filter_active');

                const filterValue = this.getAttribute('data-filter');

                items.forEach(item => {
                    // Bloq elementləri bu filtr əsasında göstərilir və ya gizlədilir filtr dəyəri * olarsa, bütün elementlər göstərilir.
                    if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    });

    
    const borders = document.getElementById('borders');
    const bar = document.getElementById('bar');
    const percentageText = document.getElementById('faiz');
    const increaseButton = document.getElementById('increase');
    const decreaseButton = document.getElementById('decrease');

    let percentage = 0;

    // faizi yeniləyir
    function updateBar() {
        bar.style.width = percentage + "%";
        percentageText.innerText = percentage + "%";
    }

    increaseButton.addEventListener("click", function() {
        if (percentage < 100) {
            percentage += 10;
            updateBar();
        }
    });

    decreaseButton.addEventListener("click", function() {
        if (percentage > 0) {
            percentage -= 10;
            updateBar();
        }
    });

    borders.addEventListener("click", function(e) {
        const newWidth = e.offsetX;
        // Bu məsafəni faizə çevirir və yuvarlaqlaşdırır.
        const newPercentage = Math.round((newWidth / borders.clientWidth) * 100);
        percentage = newPercentage;
        updateBar();
    });




   

// item məlumatlrını yaradırıq
const items = [];
for (let i = 1; i <= 100; i++) {
    items.push(`Item ${i}`);
}

// Hər səhifədə göstəriləcək elementlərin sayı
const itemsPerPage = 10;

// ilk səhifə
let currentPage = 1;

const itemList = document.getElementById('item-list');
const pageNumbers = document.getElementById('page-numbers');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

function renderItems() {
    //  itemList elementinin icini təmizləyirik əvvəlki elementlər silinir
    itemList.innerHTML = '';
    // hazırki səhifənin başlayacağı elementi müəyyənləşdirir
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = items.slice(start, end);

    currentItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        itemList.appendChild(li);
    });
}


function renderPageNumbers() {
     //    pageNumbers elementinin icini təmizləyirik əvvəlki nomreler silinir
    pageNumbers.innerHTML = '';
    // Səhifələrin ümumi sayını hesablayırıq
    const totalPages = Math.ceil(items.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        // spam etiketi yaradır
        const span = document.createElement('span');
        // səifə nomrelerni bunun icne yazrq
        span.textContent = i;
        span.classList.add('page-number');
        if (i === currentPage) {
            span.classList.add('active');
        }
        span.addEventListener('click', () => {
            currentPage = i;
            // səhifə nömrələrini yeniləmək üçün
            render();
        });
        pageNumbers.appendChild(span);
    }
}


prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        render();
    }
});

nextButton.addEventListener('click', () => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        render();
    }
});

// səifədə her seyi yenileyir
function render() {
    // Elementləri yeniləyir.
    renderItems();
    // Səhifə nömrələrini yeniləyir.
    renderPageNumbers();
    // düymələri yeniləyir
    updateButtons();
}

// Başlanğıcda səhifə məzmununu yenilə renderle
render();
