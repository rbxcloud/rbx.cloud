// Produced by fireball6197, Join the discord at: https://discordapp.com/channels/254425263717220373/254425263717220373
// Have any questions, concerns, or ideas? Message me at https://www.roblox.com/messages/compose?recipientId=989

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.notificationtick == true) {
            rbxcloud.notify("servernotification", 'Finding server, please wait...', 'Larger games take longer to find a server.', 'Notification will close automatically once server is found.')
        }

        if (request.notificationtick == false) {
            rbxcloud.clear("servernotification")
        }

        if (request.gameid) {
            console.log(request.gameid)
            $.post('http://api.rbx.cloud:80/serverfinder', JSON.stringify({ 'placeId': request.gameid }), function (r) {
                sendResponse(JSON.parse(r))
            })
        }
        return true
    })

function getUser() {
    $.get('https://assetgame.roblox.com/Game/GetCurrentUser.ashx').success(function (r) {
        localStorage.setItem('user', r)
    })
}
setInterval(getUser, 10000)

rbxcloud = {
    notify: function(notificationid,title, msg, submsg, link, callback) {
        var options = {
            title: title,
            message: msg,
            contextMessage: submsg,
            type: "basic",
            iconUrl: "images/icon.png",
            requireInteraction:true
        };
        return chrome.notifications.create(notificationid, options, function (id) {

        });
    },
    clear: function (noteid) {
        return chrome.notifications.clear(noteid)
    }
}
