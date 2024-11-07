let btn=document.querySelector('#btn')
    let sidebar=document.querySelector('.sidebar')

    btn.onclick=function()
    {
        sidebar.classList.toggle('active')
    };


const url = "/musicApi.json";
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => 
    {
        const minP=0,maxP=43;
        for(let i=0;i<43;i++)
        {
            flag=Math.floor(Math.random() * (maxP - minP) + minP);
            document.getElementsByClassName('discover_image')[i].src = data.songs[flag].photo;
            document.getElementsByClassName('Dmatter')[i].innerHTML=data.songs[flag].song;
            document.getElementsByClassName('genre')[i].textContent=data.songs[flag].genre+'||'+data.songs[flag].artist+'||'+data.songs[flag].movie;
        }
    })
    .catch(error => console.error('Error fetching data:', error));

function fun(n) {
    const matters = document.querySelectorAll('.Dmatter');
    const songTitle = matters[n].innerText;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const songData = data.songs.find(song => song.song === songTitle);

            if (songData) 
            {
                document.getElementById('audio').src = songData.songsrc;
                document.getElementById('get_image').src=songData.photo;
                document.getElementById('right_h4').textContent=songData.song;
                document.getElementById('right_p').textContent=songData.genre+'||'+songData.artist+'||'+songData.movie;
                document.getElementById('get_image').style.display='block'; 
                document.getElementById('right_names').style.display='block'; 
                document.getElementById('audio').play();
                
            } else {
                console.error('Song not found!');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}


//Artist section
function artistSongs(artistName) {
    document.getElementById('dynamicTitle').innerHTML=artistName+" "+"Songs";
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Filter songs for the selected artist
            const artistSongs = data.songs.filter(song => song.artist === artistName);

            if (artistSongs.length > 0) {
                const dynamicContainer = document.getElementById('three');
                
                // Clear previous content (optional)
                dynamicContainer.innerHTML = ''; 

                // Loop through each song and add it to the container
                artistSongs.forEach(songData => {
                    const songElement = document.createElement('div');
                    songElement.classList.add('songs_dynamic');
                    
                    // Create HTML for song element with a play button
                    songElement.innerHTML = `
                        <img src="${songData.photo}" alt="${songData.song}" class="song-image">
                        <p>${songData.song+'||'+songData.genre+'||'+songData.movie}</p>
                        <i class='bx bx-play-circle' onclick='playSongInRightCont("${songData.songsrc}", "${songData.photo}", "${songData.song}", "${songData.artist}", "${songData.genre}", "${songData.movie}")'></i>
                    `;

                    // Append each song element to the container
                    dynamicContainer.appendChild(songElement);
                });

                dynamicContainer.scrollIntoView({ behavior: 'smooth' });

            } else {
                console.error('No songs found for this artist!');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}


//Search JS
document.getElementById('search_button').addEventListener('click', () => {
    const songname = document.getElementById('search_input').value;
    searchSong(songname);
});

function searchSong(songname) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const songs = data.songs.filter(song => song.song.toLowerCase() === songname.toLowerCase());

            if (songs.length > 0) {
                const dynamicContainer = document.getElementById('three');
                dynamicContainer.innerHTML = ''; 

                songs.forEach(songData => {
                    const songElement = document.createElement('div');
                    songElement.classList.add('songs_dynamic');
                    
                    songElement.innerHTML = `
                        <img src="${songData.photo}" alt="${songData.song}" class="song-image">
                        <p>${songData.song + ' || ' + songData.genre + ' || ' + songData.movie}</p>
                        <i class='bx bx-play-circle' onclick='playSongInRightCont("${songData.songsrc}", "${songData.photo}", "${songData.song}", "${songData.artist}", "${songData.genre}", "${songData.movie}")'></i>
                    `;
                    dynamicContainer.appendChild(songElement);
                });

                dynamicContainer.scrollIntoView({ behavior: 'smooth' });

            } else {
                console.error('No songs found for this song!');
            }


            //Recommended Songs
            if (songs.length > 0) 
            {
                const artistName = songs[0].artist;
                const artistSongs = data.songs.filter(song => song.artist === artistName);

            if (artistSongs.length > 0) 
            {
                
                const dynamicContainer = document.getElementById('four');

                dynamicContainer.innerHTML = ''; 
                artistSongs.forEach(songData => {
                    const songElement = document.createElement('div');
                    songElement.classList.add('songs_dynamic');
                    
                    // Create HTML for song element with a play button
                    songElement.innerHTML = `
                        <img src="${songData.photo}" alt="${songData.song}" class="song-image">
                        <p>${songData.song+'||'+songData.genre+'||'+songData.movie}</p>
                        <i class='bx bx-play-circle' onclick='playSongInRightCont("${songData.songsrc}", "${songData.photo}", "${songData.song}", "${songData.artist}", "${songData.genre}", "${songData.movie}")'></i>
                    `;

                    // Append each song element to the container
                    dynamicContainer.appendChild(songElement);
                });

                dynamicContainer.scrollIntoView({ behavior: 'smooth' });

            } else {
                console.error('No songs found for this artist!');
            }
            }
            else 
            {
                console.error('No songs found with this title!');
            }

            
        })
        .catch(error => console.error('Error fetching data:', error));
}

//Play the Songs  in the Right Container
function playSongInRightCont(songSrc, songImage, songTitle, artist, genre, movie) {
    document.getElementById('right_h4').textContent = songTitle;
    document.getElementById('right_p').textContent = `${genre} || ${artist} || ${movie}`;
    document.getElementById('get_image').src = songImage;
    
    const audioElement = document.getElementById('audio');
    audioElement.src = songSrc;
    audioElement.play();
    
    document.getElementById('get_image').style.display = 'block'; 
    document.getElementById('right_names').style.display = 'block';
}
