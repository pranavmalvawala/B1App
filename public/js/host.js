//chat
displayName = 'Anonymous';
var keyName = 'master';
var prayerGuid = '';
var socket;
var userGuid = '';
var timerId = 0;

//player
var videoUrl = 'about:blank';
var keyName = 'master';
var currentService = null;
var data = null;

function initPlayer() {
    loadConfig();
}

function checkService() {
    if (data.services.length > 0) {
        currentService = determineCurrentService();
        if (currentService != null) {
            var currentTime = new Date().getTime();
            if (currentTime <= currentService.localStartTime) displayTimeRemaining(currentTime);
            else showVideo();
        } else showNoService();
    } else showNoService();
}

function showNoService() {
    currentService = null;
    $('#noVideoContent').html('<h2>Check Back for New Services</h2>');
    hideVideo();
}

function showVideo() {

    $('#videoFrame').show()
    $('#noVideoContent').hide();

    if ($('#videoFrame').attr('src').indexOf(currentService.videoUrl) == -1) {
        $('#videoFrame').attr('src', currentService.videoUrl);
        var seconds = Math.floor((new Date().getTime() - currentService.localStartTime) / 1000);
        if (seconds > 10) {
            if (currentService.provider == "youtube_watchparty") $('#videoFrame').attr('src', currentService.videoUrl + '&start=' + seconds.toString());
            if (currentService.provider == "vimeo_watchparty") $('#videoFrame').attr('src', currentService.videoUrl + '#t=' + seconds.toString() + "s");
        } else {
            if (currentService.provider == "youtube_watchparty") $('#videoFrame').attr('src', currentService.videoUrl + '&start=0');
            if (currentService.provider == "vimeo_watchparty") $('#videoFrame').attr('src', currentService.videoUrl + '#t=0m0s');
        }
    }
}

function hideVideo() {
    if (!$('#noVideoContent').is(':visible')) {
        $('#videoFrame').hide()
        $('#noVideoContent').css('display', 'table');
    }
    if ($('#videoFrame').attr('src') != 'about:blank') $('#videoFrame').attr('src', 'about:blank');
}

function displayTimeRemaining(currentTime) {
    hideVideo();
    var remainingSeconds = Math.floor((currentService.localCountdownTime.getTime() - currentTime) / 1000);
    if (remainingSeconds > 86400) {
        var d = currentService.localCountdownTime;
        var formattedDate = d.toDateString() + ' - ' + d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        $('#noVideoContent').html('<h2>Next Service Time</h2>' + formattedDate);
    } else {

        var hours = Math.floor(remainingSeconds / 3600);
        remainingSeconds = remainingSeconds - (hours * 3600);
        var minutes = Math.floor(remainingSeconds / 60);
        seconds = remainingSeconds - (minutes * 60);
        //console.log(seconds);
        var displayTime = ("0" + hours).slice(-2) + ':' + ("0" + minutes).slice(-2) + ':' + ("0" + seconds).slice(-2);
        $('#noVideoContent').html('<h2>Next Service Time</h2>' + displayTime);
    }

    hideVideo();

}



function loadConfig() {
    var jsonUrl = '/data/' + keyName + '/data.json?nocache=' + (new Date()).getTime();
    $.getJSON(jsonUrl, function (_data) {
        data = _data;
        updateServiceTimes();
        setInterval(checkService, 1000);
    });

}

function updateServiceTimes() {
    if (data.services != null) {
        for (i = 0; i < data.services.length; i++) {
            var s = data.services[i];
            s.localCountdownTime = new Date(new Date(s.serviceTime + 'Z').getTime());

            s.localStartTime = new Date(s.localCountdownTime.getTime());
            s.localStartTime.setSeconds(s.localStartTime.getSeconds() - getSeconds(s.earlyStart));

            s.localEndTime = new Date(s.localCountdownTime.getTime());
            s.localEndTime.setSeconds(s.localEndTime.getSeconds() + getSeconds(s.duration));
        }
    }

}


function getQs(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}



function determineCurrentService() {
    var result = null;
    var currentTime = new Date();
    for (i = 0; i < data.services.length; i++) {
        var s = data.services[i];
        if (currentTime <= s.localEndTime) {
            if (result == null || s.localEndTime < result.localEndTime) result = s;
        }
    }
    return result;
}

function getSeconds(displayTime) {
    try {
        var parts = displayTime.split(':');
        var seconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
        return seconds;
    } catch (ex) {
        return 0;
    }
}

//********************chat*******************

function keepAlive() {
    var timeout = 60 * 1000;
    if (socket.readyState == WebSocket.OPEN) socket.send('{"action":"keepAlive", "room":""}');
    timerId = setTimeout(keepAlive, timeout);
}

function catchup(data) {
    for (var i = 0; i < data.messages.length; i++) {
        handleMessage(data.messages[i]);
    }
}

function calloutReceived(data) {
    if (data.msg == '') $('#callout').hide();
    else {
        $('#callout').html(insertLinks(data.msg));
        $('#callout').show();
    }
}

function updateAttendance(data) {
    if (data.room.indexOf('.') > -1) return; //only update for the main room, not host or prayer rooms.
    if (data.totalViewers == '1') $('#attendanceCount').html('1 viewer online <i class="fas fa-chevron-down"></i>');
    else $('#attendanceCount').html(data.totalViewers.toString() + ' viewers online <i class="fas fa-chevron-down"></i>');
    setAttendanceArrow();

    var names = [];
    for (var i = 0; i < data.viewers.length; i++) {
        if (data.viewers[i].count > 1) names.push('<div><i class="fas fa-user-alt"></i> ' + data.viewers[i].displayName + '<span>(' + data.viewers[i].count.toString() + ')</span></div>')
        else names.push('<div><i class="fas fa-user-alt"></i> ' + data.viewers[i].displayName + '</div>')
    }
    $('#attendance').html(names.join(''));
}

function toggleAttendance() {
    if ($('#attendance').is(':visible')) $('#attendance').hide();
    else $('#attendance').show();
    setAttendanceArrow();
}

function setAttendanceArrow() {
    if ($('#attendance').is(':visible')) $('#attendanceCount i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
    else $('#attendanceCount i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
}


function prayerRequestReceived(data) {
    $('#prayerRequests').append('<div><a id=\"' + data.guid + '\" href="javascript:claimPrayer(\'' + data.userGuid + '\', \'' + escape(data.name) + '\');\"">' + data.name + '</a></div>');
    $('#noPrayerRequests').hide();
}

function claimPrayer(guid, name) {
    prayerGuid = guid;
    $('#noPrayerChat').hide();
    $('#prayerChat').show();
    $('#privatePrayerTitle').text('Prayer with ' + name);
    $('#prayerReceive').html('');
    socket.send(JSON.stringify({ 'action': 'joinRoom', 'room': keyName + prayerGuid, 'displayName': displayName }));
}

function chatReceived(data) {
    if (data.userGuid == userGuid) $('#msg-' + data.userGuid).remove();
    appendMessage(data.room, data.name, data.msg, data.ts);
}

function appendMessage(room, name, message, ts) {
    var div = '<div id="msg-' + ts + '" class="message">';
    if (room == keyName) div += '<span><a href="javascript:deleteMessage(\'' + ts + '\')"><i class="far fa-trash-alt"></i></a></span>';
    div += '<b>' + name + ':</b> ' + insertLinks(message) + '</div>';

    var el = null;
    if (room == keyName) el = $("#chatReceive")
    else if (room == keyName + '.host') el = $("#hostChatReceive")
    else if (room == keyName + prayerGuid) el = $("#prayerReceive");

    if (el != null) {
        el.append(div);
        el.scrollTop(el[0].scrollHeight);
    }
}



function deleteReceived(data) {
    $('#msg-' + data.ts).remove();
}

function deleteMessage(ts) {
    socket.send(JSON.stringify({ 'action': 'deleteMessage', 'room': keyName, 'ts': ts }));
}

function setCallout() {
    var content = $('#calloutText').val();
    socket.send(JSON.stringify({ 'action': 'setCallout', 'room': keyName, 'msg': content }));
    $('#calloutText').val('');
}

function insertLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp, "<a href='$1' target='_blank'>$1</a>");
}

function postMessage(room, textField) {
    var content = $('#' + textField).val();
    socket.send(JSON.stringify({ 'action': 'sendMessage', 'room': room, 'userGuid': userGuid, 'name': displayName, 'msg': content }));
    appendMessage(room, displayName, content, userGuid);
    $('#' + textField).val('');
}

function sendMessage() {
    postMessage(keyName, 'sendText');
}

function sendHostMessage() {
    postMessage(keyName + '.host', 'hostSendText');
}

function sendPrivate() {
    postMessage(keyName + prayerGuid, 'sendPrivateText');
}

function handleMessage(data) {
    if (data.action == "sendMessage") chatReceived(data);
    else if (data.action == "setCallout") calloutReceived(data);
    else if (data.action == "deleteMessage") deleteReceived(data);
    else if (data.action == "requestPrayer") prayerRequestReceived(data);
    else if (data.action == "updateConfig") window.location.reload();
    else if (data.action == "updateAttendance") updateAttendance(data);
    else if (data.action == "catchup") catchup(data);
}


function init() {

    socket = new WebSocket('wss://n0qw9vkmu0.execute-api.us-east-2.amazonaws.com/Prod');
    socket.onopen = function (e) {
        socket.send(JSON.stringify({ 'action': 'joinRoom', 'room': keyName, 'displayName': displayName }));
        socket.send(JSON.stringify({ 'action': 'joinRoom', 'room': keyName + '.host', 'displayName': displayName }));
        setTimeout(keepAlive, 30 * 1000);
    };

    socket.onmessage = function (event) {
        var data = JSON.parse(event.data);
        handleMessage(data);
    };

    socket.onclose = function (event) {
        if (event.wasClean) {
        } else {
        }
    };

    socket.onerror = function (error) {
        alert(`[error] ${error.message}`);
    };


    
    var cssUrl = '/data/' + keyName + '/data.css';
    if (getQs('preview') == 1) cssUrl = jsonUrl.replace('data.css', 'preview.css');
    $('#customCss').attr('href', cssUrl);

    $("#sendText")[0].focus();
    $("#sendText").keypress(function (e) { if (e.which == 13) { e.preventDefault(); sendMessage(); } });
    $("#hostSendText").keypress(function (e) { if (e.which == 13) { e.preventDefault(); sendHostMessage(); } });
    $("#sendPrivateText").keypress(function (e) { if (e.which == 13) { e.preventDefault(); sendPrivate(); } });
    userGuid = generateGuid();

    initEmoji();
}

function getQs(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

function generateGuid() {
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();;
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function initEmoji(el) {
    $('.emojiButton').each(function () {
        $(this).popover({
            html: true,
            content: getEmojiHtml($(this).data('field'))
        });
    }).on('shown.bs.popover', function () {
        var emojiField = $('#' + $(this).data('field'));
        $('.emojiContent a').click(function (e) {
            e.preventDefault();
            var el = $(e.currentTarget);
            emojiField.val(emojiField.val() + el.html());
            $('.emojiButton').popover('hide');
        })
    });
}

function getEmojiHtml(field) {
    var emojis = ['😀', '😁', '🤣', '😉', '😊', '😇', '😍', '😜', '🤫', '🤨', '🙄', '😬', '😔', '😷', '🤯', '😎', '😲', '❤', '👋', '✋', '🤞', '👍', '👊', '👏', '🙌', '🙏'];
    var result = '<div class="row emojiContent">';
    for (i = 0; i < emojis.length; i++) result += '<div class="col-3"><a href="#" data-field="' + field + '">' + emojis[i] + '</a></div>';
    result += '</div>';
    return result;
}