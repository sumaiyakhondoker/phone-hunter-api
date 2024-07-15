const loadPhones = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) =>{
   

    // 1. select the container
    const phoneContainer = document.getElementById('phone-container');

    // clear the phone container cards before adding new cards
    phoneContainer.textContent ='';

    // console.log(phones.length);
    const showAllContainer = document.getElementById('show-all-container');
    // display show all button if there are more than 12 phones
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    console.log('is show all', isShowAll);
    // display only first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    
    

    phones.forEach(phone =>{
        console.log(phone);
        // 2. create a div
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card bg-gray-100 shadow-xl p-8`;
        // 3. set innerHTML
        phoneCard.innerHTML = `
        <figure>
        <img
        src="${phone.image}"
        alt="Shoes" />
        </figure>
        <div class="card-body text-center">
        <h2 class="text-3xl font-bold">${phone.phone_name}</h2>
        <p>There are many variations of passages of available, but the majority have suffered</p>
        <h2 class="text-3xl font-bold">$999</h2>
        <div class="card-actions justify-center">
        <button onclick= "handleShowDetail('${phone.slug}')" class="btn btn-primary">Show details</button>
        </div>
        </div>
        `;
        // 4. append newly created element
        phoneContainer.appendChild(phoneCard);

    })
    // hide loading spinner
    toggleLoadingSpinner(false);
}

// show details handler
const handleShowDetail = async (id) =>{
  
    // console.log('show detail button clicked', id);
    // load single phone data
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    // console.log(data);
    const phone = data.data;
    
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) =>{
    console.log(phone);

    const phoneName = document.getElementById('show-details-phone-name')
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-details-container') 
    showDetailsContainer.innerHTML = `
    <div class='flex justify-center mb-5'>
    <img src="${phone.image}" alt="">
    </div>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

    <p><span class = 'font-bold'>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span class = 'font-bold'>Display Size :</span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class = 'font-bold'>Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class = 'font-bold'>Memory: </span>${phone?.mainFeatures?.memory}</p>
    <p><span class = 'font-bold'>Slug: </span>${phone.slug}</p>
    <p><span class = 'font-bold'>Release date: </span>${phone?.releaseDate || ''}</p>
    <p><span class = 'font-bold'>Brand: </span>${phone?.brand}</p>
    <p><span class = 'font-bold'>GPS: </span>${phone?.mainFeatures?.others?.GPS || 'No GPS'}</p>
    
    
    `

    // show the modal
    show_details_modal.showModal();
}


// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhones(searchText, isShowAll)
}



const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

// showAll handler
const handleShowAll = () =>{
    handleSearch(true)
}



// loadPhones()