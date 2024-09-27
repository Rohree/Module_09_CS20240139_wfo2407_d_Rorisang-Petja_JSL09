fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature   ")
    .then(res =>res.json())
    .then(data => {
        document.body.style.backgroundImage =`url(${data.urls.regular})`
        document.getElementById("author").textContent= `By: ${data.user.name}`
    }).catch(err => {
        document.body.style.backgroundImage =`url(https://media.giphy.com/media/CGXnGb7zpsvXD2uwvd/giphy.gif?cid=82a1493bhpwt20nvmluopx1vu89ze3h6o7lpl9svzp8jjbq3&ep=v1_gifs_trending&rid=giphy.gif&ct=g)`
    }
    )

    fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        
        document.getElementById("crypto-top").innerHTML = `
            <img src="${data.image.small}" />
            <span>${data.name}</span>
        `
        document.getElementById("crypto").innerHTML += `
        <p>🎯: $${data.market_data.current_price.usd}</p>
        <p>🟢: $${data.market_data.high_24h.usd}</p>
        <p>🍎: $${data.market_data.low_24h.usd}</p>
    `
    })
    .catch(err => console.error(err))

    function getCurrentTime() {
        const date = new Date()
        document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
    }
    
    setInterval(getCurrentTime, 1000)

    
    navigator.geolocation.getCurrentPosition(position => {
        fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
            .then(res => {
                if (!res.ok) {
                    throw Error("Weather data not available")
                }
                return res.json()
            })
            .then(data => {
                const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
            })
    });

