// This file edits existing HTML on the website, as well as altering the created HTML that you will be able to view in rhtml
// You will be able to see what each bit of code does by reading the comment above it.

$(document).ready(function () {
    rbxcloud;

    // ROBUX - > USD
    var usddiv = document.getElementsByClassName('age-bracket-label-username font-caption-header')[0]
   $(usddiv).ready(function () {
       var robux = $('#nav-robux-amount')[0].innerHTML.replace(/\,/g, '')
       $(robux).ready(function () {
           var floor = Math.floor;
           usddiv.innerHTML = "$"+(floor(robux) * 3.5 / 1000).toFixed(2) + " "
        })
    });
    var cUser = localStorage.getItem('user')
    console.log(cUser)

 
    // Live item counter 
    setInterval(function () { $('#item-details > div.clearfix.price-container > div.item-note.has-price-label > span.text.limited-quantity').load(location.href + " #item-details > div.clearfix.price-container > div.item-note.has-price-label > span.text.limited-quantity") }, 5000)




    // This is a bunch of random website fixes, font changes, color changes, size changes, ect.

    $('.gotham-font .font-caption-body, .gotham-font .tooltip .tooltip-inner, .gotham-font .font-caption-body:link, .gotham-font .tooltip .tooltip-inner:link, .gotham-font .font-caption-body:visited, .gotham-font .tooltip .tooltip-inner:visited, .gotham-font .font-caption-body:active, .gotham-font .tooltip .tooltip-inner:active, .gotham-font .font-caption-body:hover, .gotham-font .tooltip .tooltip-inner:hover, .gotham-font .font-caption-body:focus, .gotham-font .tooltip .tooltip-inner:focus').css({ 'font-size': '16px' })
    $('#wrap > div.container-main > div.content > div.profile-container.ng-scope > div > div.section.profile-header > div > div.profile-header-top > div.header-caption > div.header-title > h2').css({ 'font-size': '27px' })





    // Find best performing server
    if (window.location.toString().includes("games")) {
        var doc = document.getElementsByClassName('game-buttons-container')[0]
        
        var btn = document.createElement("BUTTON");   
        btn.innerHTML = "Best Performing Server"
        btn.setAttribute("id", "pingbutton")
        if (doc) { doc.appendChild(btn) }
        
        
        var placeid = document.getElementById('MultiplayerVisitButton').getAttribute('placeid')
        console.log(placeid)

        $('#pingbutton').click(function () {
            var loadingscreen = document.createElement('div');
            loadingscreen.setAttribute('id','target')
            chrome.runtime.sendMessage({ notificationtick: true }, function (response) {
                //send message to chrome extension to send notification, you cant send notifications from context scripts.
            });
            
            chrome.runtime.sendMessage({ gameid: placeid}, function (response) {
                //send message to chrome extension to send notification, you cant send notifications from context scripts.
                
                var server = response
          
                console.log(server)
                var launchFrame = $("<iframe>").hide();
                var authTicketUrl = "https://www.roblox.com/game-auth/getauthticket?"
                var baseLaunchUrl = "https://assetgame.roblox.com/game/PlaceLauncher.ashx?";

                console.log(server)
                launchParameters = {
                    request: "RequestGame",
                    gameId: server.Guid,
                    placeId: server.PlaceId
                };
                console.log(launchParameters)

                chrome.runtime.sendMessage({ notificationtick: false }, function (response) {
                    //send message to chrome extension from content script saying the notification needs to turn off.
                });
                $.ajax({
                    type: 'GET',
                    url: authTicketUrl,
                    headers: {
                        "RBX-For-Gameauth": ""
                    }
                }).success(function (authticket) {
                    var launchUrl = baseLaunchUrl + $.param(launchParameters)
                    launchFrame.attr("src", "roblox-player:1+launchmode:play+gameinfo:" + authticket + "+launchtime:" + (+new Date) + "+placelauncherurl:" + encodeURIComponent(launchUrl))
                    var url = launchFrame[0].attributes[0].value
                    window.open(url)
                }) 
            })        
        })
    }
})
