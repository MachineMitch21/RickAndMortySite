
window.addEventListener('DOMContentLoaded', function() {

    let mainContent = document.querySelector('#mainContent');
    let characterContent = document.querySelector('#characterContent');
    let episodeContent = document.querySelector('#episodeContent');
    let locationContent = document.querySelector('#locationContent');
    let searchBtn = document.querySelector('#searchBtn');
    let searchInput = document.querySelector('#searchInput');
    let characterPagination = document.querySelector('#characterPagination');
    let locationPagination = document.querySelector('#locationPagination');
    let episodePagination = document.querySelector('#episodePagination');
    let paginations = document.querySelectorAll('.pagination');

    window.addEventListener('resize', (e) => {
        let mainContentParent = mainContent.parentElement;
        if (window.innerWidth > 1200 && mainContentParent.classList.contains('container-fluid'))
        {
            mainContentParent.classList.remove('container-fluid');
            mainContentParent.classList.add('container');
        }
        else if (window.innerWidth < 1200 && mainContentParent.classList.contains('container'))
        {
            mainContentParent.classList.remove('container');
            mainContentParent.classList.add('container-fluid');
        }
    });

    hidePaginations();
    searchBtn.addEventListener('click', requestData, false);

    function searchCharacters(characterStr, status = null, species = null, gender = null)
    {
        episodesAndCharacters = undefined;

        let characterRequest = new XMLHttpRequest();
    
        let getURL = `https://rickandmortyapi.com/api/character/?name=${characterStr}`;
        getURL += (status != null ? status : "");
        getURL += (species != null ? species : "");
        getURL += (gender != null ? gender : "");

        characterRequest.open('GET', getURL);
    
        characterRequest.onload = processCharacterData;
    
        characterRequest.onerror = function(e)
        {
            console.log(this.statusText);
        }
    
        characterRequest.send();
    }

    function searchLocations(ids = null, name = null, dimension = null)
    {
        let locationRequest = new XMLHttpRequest();

        let getURL = `https://rickandmortyapi.com/api/location/${JSON.stringify(ids)}`;

        locationRequest.open('GET', getURL);

        locationRequest.onload = processLocationData;

        locationRequest.onerror = function(e)
        {
            console.log(this.statusText);
        }

        locationRequest.send();
    }

    function showPaginations()
    {
        paginations.forEach(function(pagination) {
            if (pagination.classList.contains('invisible'))
            {
                pagination.classList.remove('invisible');
            }

            if (!pagination.classList.contains('visible'))
            {
                pagination.classList.add('visible');
            }
        });
    }
    
    function hidePaginations()
    {
        paginations.forEach(function(pagination) {
            if (pagination.classList.contains('visible'))
            {
                pagination.classList.remove('visible');
            }

            if (!pagination.classList.contains('invisible'))
            {
                pagination.classList.add('invisible');
            }
        });
    }
    
    function requestData(e)
    {
        if (searchInput.value != "")
        {
            searchCharacters(searchInput.value);
        
            searchLocations([1, 3, 4]);

            let episodeRequest = new XMLHttpRequest();
            episodeRequest.open('GET', 'https://rickandmortyapi.com/api/episode/1');
    
            episodeRequest.onload = processEpisodeData;
    
            episodeRequest.onerror = function(e)
            {
                console.log(this.statusText);
            }
    
            episodeRequest.send();
        }

        e.preventDefault();
    }
    
    function processCharacterData(e)
    {
        showPaginations();
        resetContentDiv(characterContent);
        let dataResults = getDataFormat(this.responseText);
        
        for (let i = 0; i < dataResults.length; i++)
        {
            let cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.classList.add('col-sm-12');
            cardDiv.classList.add('mb-2');
            cardDiv.classList.add('info-item');
            cardDiv.classList.add('row');
        
            let cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.classList.add('col-sm-12');
            cardTitle.textContent = dataResults[i].name;
    
            cardDiv.appendChild(cardTitle);
        
            let cardImgDiv = document.createElement('div');
            cardImgDiv.classList.add('col-sm-12');
            cardImgDiv.classList.add('col-md-4');
            
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            cardBody.classList.add('row');
            cardBody.classList.add('col-sm-12');
        
            cardDiv.appendChild(cardBody);

            let cardImg = document.createElement('img');
            cardImg.classList.add('img-fluid');
            cardImg.classList.add('card-img-top');
            cardImg.src = dataResults[i].image;
            cardImgDiv.appendChild(cardImg);

            cardBody.appendChild(cardImgDiv);


            let cardText = document.createElement('p');
            cardText.classList.add('card-text');
            cardText.classList.add('col-sm-12');
            cardText.classList.add('col-md-8');
    
            cardText.textContent = `${dataResults[i].name} is a ${dataResults[i].species} from ${dataResults[i].origin.name}`;
        
            cardBody.appendChild(cardText);
    
            characterContent.appendChild(cardDiv);
        }
    }

    function processLocationData(e)
    {
        showPaginations();
        resetContentDiv(locationContent);
        let dataResults = getDataFormat(this.responseText);

        console.log(dataResults);
    
        for (let i = 0; i < dataResults.length; i++)
        {
            let cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.classList.add('col-sm-12');
            cardDiv.classList.add('mb-2');
            cardDiv.classList.add('info-item');
            cardDiv.classList.add('row');
        
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
        
            cardDiv.appendChild(cardBody);
        
            let cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = dataResults[i].name;
    
            cardBody.appendChild(cardTitle);
        
            let cardText = document.createElement('p');
            cardText.classList.add('card-text');
    
            cardText.textContent = `${dataResults[i].name} is a ${dataResults[i].type} in ${dataResults[i].dimension}`;
        
            cardBody.appendChild(cardText);
    
            locationContent.appendChild(cardDiv);
        }
    }

    function processEpisodeData(e)
    {
        showPaginations();
        resetContentDiv(episodeContent);
        let dataResults = getDataFormat(this.responseText);

        if (!dataResults.length)
        {
            dataResults = [dataResults];
        }
    
        for (let i = 0; i < dataResults.length; i++)
        {
            let cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.classList.add('col-sm-12');
            cardDiv.classList.add('mb-2');
            cardDiv.classList.add('info-item');
            cardDiv.classList.add('row');
        
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
        
            cardDiv.appendChild(cardBody);
        
            let cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = dataResults[i].name;
    
            cardBody.appendChild(cardTitle);
        
            let cardText = document.createElement('p');
            cardText.classList.add('card-text');
    
            cardText.textContent = `${dataResults[i].episode} aired on ${dataResults[i].air_date}`;
        
            cardBody.appendChild(cardText);
    
            episodeContent.appendChild(cardDiv);
        }
    }

    function resetContentDiv(contentDiv)
    {
        if (contentDiv.textContent != "")
        {
            contentDiv.textContent = "";
        }
    
        while (contentDiv.firstChild)
        {
            contentDiv.removeChild(contentDiv.firstChild);
        }
    }

    function getDataFormat(responseText)
    {
        let data = JSON.parse(responseText);

        console.log(data);
        let dataResults;
        if (data.results)
        {
            dataResults = data.results;
        }
        else 
        {
            dataResults = data;
        }

        return dataResults;
    }
});
