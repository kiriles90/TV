let met = [0, 0, 0, 0, 0, 0];

function initialize() {
    let temploc = window.location.href.replace('https:', 'http:');
    temploc.indexOf('http://www.') === -1 ? temploc = temploc.replace('http://', 'http://www.') : null;
    window.location.href !== temploc ? window.location.href = temploc : null;
    document.querySelectorAll('#hoz > a').forEach(a => {
        const h = a.href;
        if (!h) {
            return;
        }
        if (h.indexOf('.m3u8') === -1 || h.indexOf('http:') !== -1 && window.location.protocol === 'https:') {
            a.classList.add('extCh');
        }
    });
    const keyHandler = e => {
        if (e.key === 'ArrowLeft' || e.key === 'MediaTrackPrevious' || e.key === 'ChannelDown') {
            changeCh('previous');
        } else if (e.key === 'ArrowRight' || e.key === 'MediaTrackNext' || e.key === 'ChannelUp') {
            changeCh('next');
        }
    };
    if (document.addEventListener) {
        document.addEventListener('click', linkClick, false);
        document.addEventListener('keyup', keyHandler, false);
        document.addEventListener('fullscreenchange', () => { document.activeElement.blur(); }, false);
    } else {
        document.attachEvent('onclick', linkClick);
    }
    const MIN_HOR = 160, MAX_VER = 60, WITHIN_MS = 1000;
    let sx = 0, sy = 0, st = 0;
    const el = document.getElementById('ifr0v');
    if (!el) {
        return;
    }
    const onDown = e => {
        sx = e.pageX;
        sy = e.pageY;
        st = performance.now();
    };
    const onUp = e => {
        if (!st) {
            return;
        }
        const dx = e.pageX - sx, dy = e.pageY - sy, elapsed = performance.now() - st;
        if (Math.abs(dx) > MIN_HOR && Math.abs(dy) < MAX_VER && elapsed < WITHIN_MS) {
            dx < 0 ? changeCh('next') : changeCh('previous');
        }
        st = 0;
    };
    let lastTap = 0;
    window.screen.orientation.addEventListener('change', () => { if (window.screen.orientation.type.indexOf('landscape') === -1) { document.exitFullscreen?.() } else if (!document.querySelector('video').paused) { el.requestFullscreen?.(); }});
    el.addEventListener('loadeddata', el.play);
    el.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); });
    el.addEventListener('dblclick', () => { document.fullscreenElement ? document.exitFullscreen?.() : el.requestFullscreen?.(); });
    el.addEventListener('volumechange', () => { try { localStorage.setItem('volume', el.volume); } catch {} });
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointerup', (e) => { onUp(e); e.preventDefault(); e.stopPropagation(); if (e.pointerType !== 'touch') return; const now = Date.now(); if (now - lastTap < 300) document.fullscreenElement ? document.exitFullscreen?.() : el.requestFullscreen?.(); lastTap = now; }, { passive: false });
    el.addEventListener('pointercancel', () => { st = 0; });
    let oifr = document.getElementById('ifr5');
    const doc5 = oifr.contentWindow.document;
    const templ5 = '<!DOCTYPE html><html lang="en"><head><title>PlayIMDb Search</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="apple-mobile-web-app-title" content="PlayIMDb Search"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-title" content="PlayIMDb Search"><meta name="mobile-web-app-capable" content="yes"><meta name="theme-color" content="#000000"><meta name="msapplication-navbutton-color" content="#000000"><meta name="apple-mobile-web-app-status-bar-style" content="#000000"><link href="src/default.css" rel="stylesheet" type="text/css"><link rel="shortcut icon" href="src/img/favicon.ico"><link rel="apple-touch-icon" sizes="192x192" href="src/img/favicon.png"><script src="src/default.js"></script></head><body><form id="frmTest" method="get" onsubmit="return validateForm();"><iframe id="ifrpl" allow="fullscreen" scrolling="no" autoFocus></iframe><label id="closepl" onclick="closePl();">&#x2716;</label><label id="extpl" onclick="extPl();">&#x2750;</label><label id="imdblnk" onclick="imdblnk();">i</label><label id="sharelnk" onclick="sharelnk();"><</label><input id="txtValue" type="text" value="" placeholder="Title or IMDb ID" spellcheck="false" autoFocus><input id="btnSubmit" type="submit" value="&#x2315;"><br><label id="infLbl">(e.g <i>jurassic park III,</i> <i>jurassic park 2001,</i> <i>tt0163025,</i> <i>0163025</i> etc or passing it in the url e.g <i>../?playimdb#jurassic+park+2001</i> etc..)</label><br><label id="noRes"><i>(!)</i> Your search did not match any results, try different keywords or use the IMDb ID</label></form><script>celvarevents("nosnow");</script></body></html>'; // & sandbox="allow-scripts allow-same-origin allow-presentation allow-top-navigation allow-pointer-lock allow-forms"
    oifr = met[5]++ < 1 ? doc5.open() && doc5.write(templ5) && doc5.close() : oifr;
    const hashParams = window.location.hash.substr(1);
    if (window.location.href.indexOf('playimdb') !== -1) {
        if (hashParams) {
            document.getElementById('ifr5').contentWindow.document.getElementById('txtValue').value = decodeURIComponent(hashParams);
            validateForm('urlparams');
        }
        this.showifr(5);
    }
}

function showifr(ifr, churl) {
    if (ifr === 1) {
        window.open('https://epg.cyta.com.cy/tv-guide');
        return;
    }
    let odeer = document.getElementsByClassName('deer')[0];
    let oxmasSnow = document.getElementById('xmasSnow');
    let oifr = document.getElementById('ifr' + ifr);
    let prevstate = oifr.style.display;
    oifr.style.display = prevstate == 'block' ? 'none' : 'block';
    switch (ifr) {
        case 0:
            if (odeer) {
                odeer.style.marginTop = '-212px';
            }
            oifr = met[0] < 1 ? (oifr.querySelector('video') ? oifr.querySelector('video').setAttribute('src', churl) : null) : oifr;
            break;
        case 1:
            if (odeer) {
                odeer.style.marginTop = '-212px';
            }
            oifr = met[1]++ < 1 ? oifr.setAttribute('src', 'https://epg.cyta.com.cy/tv-guide') : oifr;
            break;
        case 2:
            if (odeer) {
                odeer.style.marginTop = '-212px';
            }
            oifr = met[2]++ < 1 ? oifr.setAttribute('src', 'https://programmatileorasis.gr/widget_horizontal_show.php?width=9') : oifr;
            break;
        case 3:
            let doc3 = oifr.contentWindow.document;
            let templ3 = '<!DOCTYPE html><html lang="en"><head><title>TV</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="apple-mobile-web-app-title" content="TV"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-title" content="TV"><meta name="mobile-web-app-capable" content="yes"><meta name="theme-color" content="#000000"><meta name="msapplication-navbutton-color" content="#000000"><meta name="apple-mobile-web-app-status-bar-style" content="#000000"><link href="src/default.css" rel="stylesheet" type="text/css"><link rel="shortcut icon" href="src/img/favicon.ico"><link rel="apple-touch-icon" sizes="192x192" href="src/img/favicon.png"></head><body><script>parent.moreCh(\"cy\");</script></body></html>';
            oifr = met[3]++ < 1 ? doc3.open() && doc3.write(templ3) && doc3.close() : oifr;
            break;
        case 4:
            if (odeer) {
                odeer.style.marginTop = '-157px';
            }
            if (oxmasSnow) {
                oxmasSnow.style.visibility = 'hidden';
            }
            let doc4 = oifr.contentWindow.document;
            let templ4 = '<!DOCTYPE html><html lang="en"><head><title>TV</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="apple-mobile-web-app-title" content="TV"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-title" content="TV"><meta name="mobile-web-app-capable" content="yes"><meta name="theme-color" content="#000000"><meta name="msapplication-navbutton-color" content="#000000"><meta name="apple-mobile-web-app-status-bar-style" content="#000000"><link href="src/default.css" rel="stylesheet" type="text/css"><link rel="shortcut icon" href="src/img/favicon.ico"><link rel="apple-touch-icon" sizes="192x192" href="src/img/favicon.png"></head><body><script>parent.moreCh(\"gr\");</script></body></html>';
            oifr = met[4]++ < 1 ? doc4.open() && doc4.write(templ4) && doc4.close() : oifr;
            break;
        case 5:
            if (odeer) {
                odeer.style.marginTop = '0px';
            }
            document.title = 'PlayIMDb Search';
            let curparam = oifr.contentWindow.document.getElementById('txtValue').getAttribute('data-curparam');
            if (window.parent.document.location.href.indexOf('?playimdb') === -1) {
                window.history.pushState({urlPath:'?playimdb'}, 'PlayIMDb Search', '?playimdb');
            }
            if (curparam) {
                window.parent.document.location.href = window.parent.document.location.href.split('#', 1) + '#' + curparam.replace(/ /g, '+').replace(/%20/g, '+');
                oifr.contentWindow.document.getElementById('txtValue').value = curparam;
            } else {
                oifr.contentWindow.document.getElementById('txtValue').value = '';
            }
            oifr.contentWindow.document.documentElement.style.overflow = 'hidden';
            oifr.contentWindow.document.getElementById('txtValue').focus();
            oifr.style.zIndex = 118;
            setTimeout(() => {
                oifr.style.zIndex = 18;
            }, 100);
            return false;
            break;
        default:
    }
}

function hideifr() {
    if (event.target.closest('.deer') || event.target.closest('video') || event.target.id === 'ifr0p' || event.target.id === 'ifr0n') {
        return;
    }
    let oifrs = document.querySelectorAll('#ifr0, #ifr1, #ifr2, #ifr3, #ifr4, #ifr5');
    let odeer = document.getElementsByClassName('deer')[0];
    let oxmasSnow = document.getElementById('xmasSnow');
    let ifrs = document.getElementById('ifrs');
    ifrs.removeAttribute('style');
    oifrs[0].querySelector('video') ? oifrs[0].querySelector('video').src = '' : null;
    oifrs.forEach((oifr) => { oifr.style.display = 'none'; });
    if (odeer) {
        odeer.style.marginTop = '';
    }
    if (oxmasSnow) {
        oxmasSnow.style.visibility = 'visible';
    }
    document.title = 'TV';
    if (window.parent.document.location.href.indexOf('?playimdb') !== -1) {
        window.history.pushState({urlPath:'../'}, 'TV', '../');
    }
}

function showCh(src) {
    if (src.indexOf('.m3u8') === -1 || src.indexOf('http:') !== -1 && window.location.protocol === 'https:') {
        window.open(src);
    } else {
        this.showifr(0, src);
        const video = document.querySelector('video');
        try { const vol = localStorage.getItem('volume'); if (vol !== null) video.volume = +vol; } catch {}
        const ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('netcast') !== -1 || ua.indexOf('smarttv') !== -1) {
          video.requestFullscreen?.();
        }
    }
    return false;
}

function changeCh(direction, ch) {
    const video = document.querySelector('video');
    if (!video) {
        return;
    }
    const videosrc = video.currentSrc || video.src;
    const current = ch || document.querySelector(`a[href="${videosrc}"]`);
    if (!current) {
        return;
    }
    const container = current.parentElement;
    const items = Array.from(container.children);
    let index = items.indexOf(current);
    if (index === -1) {
        return;
    }
    const step = direction === 'previous' ? -1 : 1;
    const total = items.length;
    for (let i = 1; i <= total; i++) {
        const nextIndex = (index + step * i + total) % total;
        const candidate = items[nextIndex];
        if (candidate.tagName === 'A' && candidate.href && candidate.href.indexOf('.m3u8') !== -1) {
            if (candidate.href.indexOf('http:') !== -1 && window.location.protocol === 'https:') {
                // placeholder for this condition
            } else {
                video.src = candidate.href;
                return;
            }
        }
    }
}

function linkClick(e) {
    e = window.e || e;
    if (e.target.tagName !== 'A') {
        return;
    }
    e.target.closest('nav>ul>li').style.display='none';
    setTimeout(() => {
        e.target.closest('nav>ul>li').removeAttribute('style');
    }, 200);
}

function validateForm(urlparams) {
    let thisifr = document.getElementById('frmTest') ? document : document.getElementById('ifr5').contentWindow.document;
    thisifr.getElementById('noRes').style.opacity = 0;
    let text = thisifr.getElementById('txtValue').value.replace(/[^a-zA-Z0-9]|\s/g, ' ').replace(/ +(?= )/g,'').trim();
    if (text) {
        if (!urlparams) {
            thisifr.getElementById('btnSubmit').style.opacity = 0.75;
            thisifr.getElementById('btnSubmit').addEventListener('transitionend', function () {
                return thisifr.getElementById('btnSubmit').style.opacity = 1;
            });
        }
        thisifr.getElementById('txtValue').value = text;
        thisifr.getElementById('txtValue').setAttribute('data-curparam', text);
        window.parent.document.location.href = window.parent.document.location.href.split('#', 1) + '#' + text.replace(/ /g, '+').replace(/%20/g, '+');
        let year = text.match(/\d{4}/) ? text.match(/\d{4}/)[0] : null;
        text = text.toLowerCase().replace(' ' + year, '');
        let cback = text.replace(/\s/g, '_');
        text = escape(text);
        if (text.indexOf('tt') === 0) {
            text = text.replace('tt', '');
        }
        if (isNaN(text)) {
            let movie = function () {
                let i = 0;
                fetchJsonp('https://www.omdbapi.com/?apikey=a2914b7a&r=jsonp&s=' + text + '&y=' + year, {
                    jsonpCallbackFunction: 'imdb$' + cback,
                    timeout: 30000
                }).then(function (response) {
                    return response.json();
                }).then(function getID(data) {
                    if (i < 10 && data && data.Search && data.Search[i] && data.Search[i].imdbID) {
                        text = data.Search[i].imdbID;
                        if (text.indexOf('tt') === 0) {
                            showPl(text);
                        } else {
                            i = i + 1;
                            return getID(data);
                        }
                    } else {
                        thisifr.getElementById('noRes').style.opacity = 1;
                    }
                }).catch(() => {
                    thisifr.getElementById('noRes').style.opacity = 1;
                });
            }();
        } else {
            text = 'tt' + text;
            showPl(text);
        }
    }
    return false;
}

function showPl(url) {
    let thisifr = document.getElementById('frmTest') ? document : document.getElementById('ifr5').contentWindow.document;
    let elms = thisifr.querySelectorAll('#ifrpl, #closepl, #extpl, #imdblnk, #sharelnk');
    elms[0].src = 'https://streamimdb.ru/embed/movie/' + url + '/';
    elms.forEach((elm) => { elm.style.display = 'inline-block'; });
}

function closePl() {
    let elms = document.querySelectorAll('#ifrpl, #closepl, #extpl, #imdblnk, #sharelnk');
    elms.forEach((elm) => { elm.style.display = 'none'; });
    elms[0].src = '';
    document.getElementById('txtValue').value = '';
    document.getElementById('txtValue').setAttribute('data-curparam', '');
    window.parent.history.pushState({urlPath: window.parent.document.location.href.split('#', 1)}, 'PlayIMDb Search', window.parent.document.location.href.split('#', 1));
}

function extPl() {
    window.open(document.getElementById('ifrpl').src, '_blank');
}

function imdblnk() {
    window.open('https://www.imdb.com/title/tt' + document.getElementById('ifrpl').src.split('//')[1].split('tt')[1], '_blank');
}

function sharelnk() {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(window.parent.document.location.href);
    } else {
        let tempInput = document.createElement('textarea');
        tempInput.value = window.parent.document.location.href;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    }
    alert('Link copied to clipboard');
}

let defaultOptions = {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null
};

function generateCallbackFunction() {
    return "jsonp_".concat(Date.now(), "_").concat(Math.ceil(Math.random() * 100000));
}

function clearFunction(functionName) {
    try {
        delete window[functionName];
    } catch (e) {
        window[functionName] = undefined;
    }
}

function removeScript(scriptId) {
    let script = document.getElementById(scriptId);
    if (script) {
        document.getElementsByTagName('head')[0].removeChild(script);
    }
}

function fetchJsonp(_url) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let url = _url;
    let timeout = options.timeout || defaultOptions.timeout;
    let jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;
    let timeoutId;
    return new Promise(function (resolve, reject) {
        let callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
        let scriptId = "".concat(jsonpCallback, "_").concat(callbackFunction);
        window[callbackFunction] = function (response) {
            resolve({
                ok: true,
                json: function json() { return Promise.resolve(response); }
            });
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            removeScript(scriptId);
            clearFunction(callbackFunction);
        };
        url += url.indexOf('?') === -1 ? '?' : '&';
        let jsonpScript = document.createElement('script');
        jsonpScript.setAttribute('src', "".concat(url).concat(jsonpCallback, "=").concat(callbackFunction));
        if (options.charset) {
            jsonpScript.setAttribute('charset', options.charset);
        }
        if (options.nonce) {
            jsonpScript.setAttribute('nonce', options.nonce);
        }
        if (options.referrerPolicy) {
            jsonpScript.setAttribute('referrerPolicy', options.referrerPolicy);
        }
        jsonpScript.id = scriptId;
        document.getElementsByTagName('head')[0].appendChild(jsonpScript);
        timeoutId = setTimeout(() => {
            reject(new Error("JSONP request to ".concat(_url, " timed out")));
            clearFunction(callbackFunction);
            removeScript(scriptId);
            window[callbackFunction] = function () {
                clearFunction(callbackFunction);
            };
        }, timeout);
        jsonpScript.onerror = function () {
            reject(new Error("JSONP request to ".concat(_url, " failed")));
            clearFunction(callbackFunction);
            removeScript(scriptId);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    });
}

function celvarevents(nosnow) {
    let dat = new Date();
    let d = dat.getDate();
    let m = dat.getMonth();
    if (m == 0 && d <= 10 || m == 11 && d >= 06) {
        let setup = function setup() {
            window.addEventListener('DOMContentLoaded', generateSnowflakes, false);
            window.addEventListener('resize', setResetFlag, false);
        };
        let getSupportedPropertyName = function getSupportedPropertyName(properties) {
            for (let i = 0; i < properties.length; i++) {
                if (typeof document.body.style[properties[i]] != 'undefined') {
                    return properties[i];
                }
            }
            return null;
        };
        let Snowflake = function Snowflake(element, radius, speed, xPos, yPos) {
            this.element = element;
            this.radius = radius;
            this.speed = speed;
            this.xPos = xPos;
            this.yPos = yPos;
            this.counter = 0;
            this.sign = Math.random() < 0.5 ? 1 : -1;
            this.element.style.opacity = 0.1 + Math.random();
            this.element.style.fontSize = 12 + Math.random() * 50 + 'px';
        };
        let setTranslate3DTransform = function setTranslate3DTransform(element, xPosition, yPosition) {
            let val = 'translate3d(' + xPosition + 'px, ' + yPosition + 'px' + ', 0)';
            element.style[transformProperty] = val;
        };
        let generateSnowflakes = function generateSnowflakes() {
            let originalSnowflake = document.querySelector('.snowflake');
            let snowflakeContainer = originalSnowflake.parentNode;
            browserWidth = document.documentElement.clientWidth;
            browserHeight = document.documentElement.clientHeight;
            for (let i = 0; i < numberOfSnowflakes; i++) {
                let snowflakeCopy = originalSnowflake.cloneNode(true);
                snowflakeContainer.appendChild(snowflakeCopy);
                let initialXPos = getPosition(50, browserWidth);
                let initialYPos = getPosition(50, browserHeight);
                let speed = 5 + Math.random() * 40;
                let radius = 4 + Math.random() * 10;
                let snowflakeObject = new Snowflake(snowflakeCopy, radius, speed, initialXPos, initialYPos);
                snowflakes.push(snowflakeObject);
            }
            snowflakeContainer.removeChild(originalSnowflake);
            moveSnowflakes();
        };
        let moveSnowflakes = function moveSnowflakes() {
            for (let i = 0; i < snowflakes.length; i++) {
                let snowflake = snowflakes[i];
                snowflake.update();
            }
            if (resetPosition) {
                browserWidth = document.documentElement.clientWidth;
                browserHeight = document.documentElement.clientHeight;
                for (let i = 0; i < snowflakes.length; i++) {
                    let snowflake = snowflakes[i];
                    snowflake.xPos = getPosition(50, browserWidth);
                    snowflake.yPos = getPosition(50, browserHeight);
                }
                resetPosition = false;
            }
            requestAnimationFrame(moveSnowflakes);
        };
        let getPosition = function getPosition(offset, size) {
            return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
        };
        let setResetFlag = function setResetFlag() {
            resetPosition = true;
        };
        let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        let transforms = ['transform', 'msTransform', 'webkitTransform', 'mozTransform', 'oTransform'];
        let transformProperty = getSupportedPropertyName(transforms);
        let snowflakes = [];
        let browserWidth;
        let browserHeight;
        let numberOfSnowflakes = 50;
        let resetPosition = false;
        Snowflake.prototype.update = function () {
            this.counter += this.speed / 5000;
            this.xPos += this.sign * this.speed * Math.cos(this.counter) / 40;
            this.yPos += Math.sin(this.counter) / 40 + this.speed / 30;
            setTranslate3DTransform(this.element, Math.round(this.xPos), Math.round(this.yPos));
            if (this.yPos > browserHeight) {
                this.yPos = -50;
            }
        };
        if (!nosnow) {
            document.body.innerHTML += '<div id="snowflakeContainer"><p class="snowflake">*</p></div><div id="new-year"><svg id="new-year-svg" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" viewBox="0 0 500 200"  ><defs><path id="happy-path" d="M190.479,20.124h6.193v7.014h6.768v-7.014h6.221v20.043h-6.221V32.06h-6.768v8.107h-6.193V20.124zM231.698,36.858h-7.031l-0.977,3.309h-6.324l7.533-20.043h6.756l7.531,20.043h-6.485L231.698,36.858zM230.413,32.524l-2.212-7.205l-2.189,7.205H230.413zM246.728,20.124h10.295c2.242,0,3.921,0.533,5.038,1.6c1.116,1.066,1.675,2.584,1.675,4.553c0,2.023-0.608,3.605-1.825,4.744c-1.217,1.14-3.074,1.709-5.571,1.709h-3.391v7.438h-6.221V20.124zM252.948,28.669h1.518c1.194,0,2.032-0.207,2.516-0.622c0.483-0.415,0.725-0.945,0.725-1.593c0-0.629-0.21-1.162-0.629-1.6c-0.419-0.438-1.208-0.656-2.365-0.656h-1.764V28.669zM272.548,20.124h10.295c2.242,0,3.921,0.533,5.038,1.6c1.116,1.066,1.675,2.584,1.675,4.553c0,2.023-0.608,3.605-1.825,4.744c-1.217,1.14-3.074,1.709-5.571,1.709h-3.391v7.438h-6.221V20.124zM278.769,28.669h1.518c1.194,0,2.032-0.207,2.516-0.622c0.483-0.415,0.725-0.945,0.725-1.593c0-0.629-0.21-1.162-0.629-1.6c-0.419-0.438-1.208-0.656-2.365-0.656h-1.764V28.669zM296.373,20.124h6.879l4.038,6.762l4.046-6.762h6.843l-7.793,11.648v8.395h-6.207v-8.395L296.373,20.124z"/><path id="ear-path" d="M406.717,124.56c-1.023,1.445-2.131,3.061-4.259,2.772c-2.259-0.306-2.811-2.237-3.431-4.025c-0.09-0.259-0.105-0.545-0.15-0.819c-1.198-7.405-0.307-14.724,1.18-21.96c0.799-3.895,2.174-7.672,3.292-11.508c-3.756-1.819-5.97-1.39-8.683,2.002c-1.294,1.616-2.771,1.333-4.323,0.876c-1.474-0.433-2.901-0.685-3.395-2.762c-0.613-2.582-1.802-5.054-2.979-7.458c-0.29-0.592-1.583-1.118-2.265-0.972c-0.666,0.143-1.388,1.093-1.657,1.842c-0.966,2.682,0.569,6.094,3.312,8.143c0.597,0.446,1.206,1.379,1.187,2.07c-0.252,8.868-1.593,17.586-4.166,26.074c-0.714,2.359-1.863,4.654-3.183,6.745c-1.709,2.709-3.949,2.404-5.259-0.554c-0.473-1.068-0.806-2.224-1.03-3.372c-1.571-8.042-0.969-16.072,0.276-24.081c0.541-3.475,1.262-6.922,2.03-11.08c-2.842,0.461-5.271,0.856-8.04,1.305c-2.777-2.893-5.969-3.495-10.297-1.569c-3.491,1.554-5.731,4.333-7.347,7.667c-3.203,6.611-4.091,13.695-3.843,20.916c0.114,3.297-0.852,6.144-2.391,8.896c-1.642,2.934-4.114,4.489-7.558,4.103c-3.216-0.362-5.17-2.456-6.106-5.293c-0.84-2.544-1.691-7.769-1.691-10.524l0.084-2.648c0.247-5.555,1.097-10.806,3.217-15.757c0.632-1.479,1.789-3.119,3.12-4.198l-2.099-2.424c-5.873,2.566-8.426,7.539-10.233,12.924c-0.868,2.546-2.155,7.69-2.04,10.239l0.069,2.272c-0.083,3.547,0.183,6.039,1.506,10.314c1.837,5.941,6.042,9.225,11.444,9.458c5.932,0.258,9.823-2.789,12.34-7.917c0.259-0.528,0.543-1.044,0.944-1.81c0.315,1.01,0.517,1.725,0.759,2.425c0.908,2.628,2.006,5.249,5.117,5.746c3.177,0.507,5.182-1.707,6.457-4.084c2.088-3.894,3.695-8.044,5.508-12.085c0.164-0.368,0.358-0.723,0.74-1.487c0.055,1.197,0.045,1.896,0.125,2.585c0.502,4.368,1.067,8.74,3.901,12.351c2.864,3.646,7.474,3.907,10.706,0.594c0.956-0.98,1.946-2.116,2.394-3.369c1.42-3.972,2.914-7.966,3.791-12.077c1.398-6.56,2.325-13.221,3.421-19.648c2.08,0.713,4.336,1.487,6.505,2.23c-0.692,4.938-1.538,10.006-2.083,15.107c-0.541,5.071-0.499,10.156,1.406,15.017c1.645,4.198,5.27,5.917,9.611,4.661c4.363-1.262,7.274-3.958,8.469-15.164l-0.934,0.089C409.422,119.302,409.147,121.126,406.717,124.56zM360.222,112.837c-0.603,2.653-1.947,5.189-3.273,7.602c-0.5,0.912-1.993,1.929-2.876,1.802c-0.886-0.128-2.027-1.518-2.26-2.538c-0.585-2.551-0.721-5.207-1.161-8.857c0.768-3.898,1.515-8.763,2.736-13.507c0.877-3.414,2.829-6.417,6.002-8.203c1.146-0.644,2.727-0.679,4.103-0.657c0.426,0.007,1.276,1.201,1.183,1.714C363.292,97.761,361.926,105.338,360.222,112.837zM419.532,115.219c0-12.133,0.254-46.425,0.254-52.913c0-0.084,0.59-0.084,0.674-0.084c0.926,0,8.088,6.909,8.088,7.583c0,3.117-4.717,38.252-4.717,46.762c-0.676,0.337-1.602,0.59-2.359,0.59C420.376,117.157,419.532,116.651,419.532,115.219zM426.19,127.857c0,2.696-1.686,5.392-4.889,5.392c-3.874,0-5.392-2.274-5.392-4.802c0-2.949,2.107-6.066,5.308-6.066C424.505,122.381,426.19,125.161,426.19,127.857z"/><path id="y-path" d="M284.696,170.172c2.44-0.078,5.23-0.183,7.442-1.135c5.449-2.347,8.231-7.203,9.789-12.566c1.444-4.97,2.521-10.111,3.114-15.251c0.979-8.493-0.432-26.082-0.432-26.082l-0.169-2.341c-0.758-7.796-2.058-16.429-3.284-24.289c-0.423,1.21-0.863,2.415-1.265,3.631c-3.14,9.52-6.693,18.855-12.234,27.295c-2.69,4.095-5.7,7.95-9.874,10.625c-1.839,1.18-3.917,2.179-6.024,2.716c-6.749,1.715-11.068-1.434-11.976-8.368c-0.948-7.247,0.464-14.272,1.939-21.281c2.25-10.681,4.739-21.332,4.853-32.316c0.03-2.888-0.238-5.858-0.924-8.654c-0.959-3.902-3.937-5.207-7.319-3.044c-2.317,1.482-4.464,3.613-5.961,5.924c-4.692,7.242-6.827,15.456-7.992,23.912c-0.405,2.947-0.479,5.969-0.369,8.944c0.051,1.351,0.957,2.659,1.401,4.012c0.203,0.618,0.225,1.296,0.329,1.946c-0.743-0.149-1.937-0.068-2.153-0.488c-0.971-1.891-2.089-3.862-2.39-5.916c-1.99-13.571,1.077-25.854,10.161-36.31c3.738-4.303,8.579-6.77,14.435-6.909c4.879-0.116,7.738,1.895,9.072,6.569c1.468,5.149,1.241,10.41,0.129,15.511c-2.142,9.832-4.768,19.556-7.025,29.364c-1.231,5.35-2.259,10.765-1.54,16.321c0.682,5.263,3.711,7.056,8.691,5.091c3.983-1.571,6.778-4.603,9.171-7.966c7.643-10.748,11.921-22.843,13.908-35.793c0.686-4.465,1.089-8.973,1.705-13.45c0.179-1.293,0.417-2.677,1.049-3.779c0.518-0.906,1.659-1.457,2.523-2.165c0.622,0.915,1.563,1.754,1.8,2.759c0.459,1.949,0.477,3.998,0.758,5.993c0.914,6.464,1.869,12.923,2.798,19.386c0.808,5.636,1.886,13.371,2.661,18.825l0.207,2.318c0.615,8.838,0.812,17.805-0.532,26.59c-1.421,9.283-3.696,18.275-9.8,25.778c-3.688,4.534-8.481,7.071-14.315,7.646c-0.942,0.093-1.849,0.114-2.717,0.068L284.696,170.172z"/><path id="ye-path" d="M287.053,173.223c-9.205,0.907-15.088-5.002-14.533-14.351c0.552-9.3,4.909-16.955,10.026-24.326c5.606-8.077,11.912-15.37,20.146-20.848c0.546-0.364,1.748-0.901,1.748-0.901s2.031-0.758,3.403-1.14s3.649-0.766,3.649-0.766c2.687-0.505,4.427-0.816,6.499-0.763c4.118,0.106,8.034-0.783,8.034-0.783c7.391-1.539,12.221-11.504,10.252-18.448c-0.608-2.147-2.502-2.798-4.165-1.3l-2.166-2.49c0.937-0.433,1.947-0.767,2.958-0.963c6.018-1.17,9.421,1.746,9.254,7.875c-0.208,7.669-5.826,14.722-14.064,17.2c-1.001,0.392-2.153,0.775-2.153,0.775c-4.613,0.772-7.881,0.407-7.881,0.407c-1.97-0.115-3.266,0.084-4.157,0.253c-0.709,0.135-2.204,0.556-2.204,0.556s-2.451,0.32-3.512,0.604s-3.578,1.325-3.578,1.325s-0.708,0.441-0.97,0.644c-11.366,8.146-21.111,21.347-25.327,36.335c-1.351,4.803-1.338,9.774,1.059,14.431c1.16,2.254,2.768,3.705,5.324,3.624c0.765-0.024,1.564-0.052,2.369-0.106L287.053,173.223z"/><path id="new-path" d="M145.333,130.093c0.669,2.194-0.211,3.95-1.429,5.516c-3.465,4.457-11.309,4.125-15.224-0.635c-3.273-3.979-3.988-8.816-4.199-13.712c-0.447-10.312,1.673-20.296,3.873-30.303c1.231-5.598,1.676-11.375,2.343-17.087c0.148-1.274-0.152-2.636-0.428-3.917c-1.012-4.687-4.817-6.663-9.331-4.913c-2.915,1.131-4.947,3.303-6.685,5.779c-4.012,5.715-6.208,12.231-8.139,18.843c-3.253,11.134-4.772,22.556-5.505,34.101c-0.136,2.152-0.415,4.3-0.468,6.453c-0.103,4.162-5.818,6.183-9.137,3.985c-0.551-0.364-0.867-1.559-0.792-2.321c0.845-8.646,1.977-17.269,2.658-25.927c0.945-12.016,1.403-24.073-1.532-35.909c-0.788-3.178-2.365-6.202-3.887-9.138c-0.665-1.283-1.972-2.357-3.213-3.19c-2.7-1.813-5.657-1.07-7.579,1.757c-2.339,3.439-2.859,7.406-2.666,11.378c0.476,9.799,2.659,19.115,8.699,27.164c0.155,0.207,0.229,0.475,0.402,0.844c-2.155,0.325-3.7-0.697-4.813-2.066c-8-9.839-11.293-20.962-8.326-33.478c0.997-4.201,3.208-7.913,7.676-9.486c4.889-1.722,11.163,0.542,14.563,5.145c4.531,6.134,6.871,13.156,7.948,20.583c0.682,4.7,0.846,9.475,1.194,13.636c1.454-4.187,2.812-9.073,4.846-13.662c1.842-4.158,4.242-8.107,6.732-11.931c2.05-3.147,5.208-5.168,8.666-6.63c6.354-2.69,12.348-0.475,15.411,5.715c2.277,4.603,2.706,9.555,1.757,14.462c-1.688,8.719-3.779,17.36-5.687,26.038c-1.406,6.396-2.662,12.821-1.919,19.416c0.199,1.771,0.643,3.56,1.283,5.224c1.017,2.644,3.055,4.06,5.959,4.058c2.801-0.001,4.479-1.552,5.544-3.993C144.222,131.212,144.674,130.602,145.333,130.093zM218.268,93.114c0.221,9.172-0.831,18.205-4.015,26.864c-1.557,4.236-3.804,8.085-8.193,10.064c-3.464,1.562-6.769,0.682-9.06-2.367c-2.789-3.712-3.467-8.114-4.003-12.552c-0.05-0.412-0.057-0.828-0.086-1.289c-1.413,3.097-2.551,6.28-4.258,9.121c-1.403,2.334-3.207,4.604-5.319,6.299c-3.747,3.004-7.154,1.754-8.665-2.827c-0.491-1.488-0.791-3.04-1.319-5.117c-0.462,1.092-0.728,1.756-1.021,2.407c-2.573,5.714-6.95,8.714-12.421,8.488c-6.041-0.25-9.706-3.834-11.43-9.146c-3.557-10.956-2.047-21.448,4.294-31.065c2.631-3.991,6.582-6.093,11.507-6.027c3.812,0.052,6.251,2.324,6.557,6.129c0.594,7.397-3.562,14.252-10.799,17.743c-1.246,0.601-2.522,1.223-3.854,1.541c-1.283,0.306-1.803,0.854-1.564,2.142c0.541,2.924,0.828,5.922,1.658,8.76c0.863,2.952,2.844,5.126,6.14,5.523c3.537,0.425,6.062-1.205,7.675-4.246c1.736-3.273,2.968-6.685,2.848-10.51c-0.182-5.858,0.027-11.695,2.088-17.29c1.752-4.761,5.438-7.205,9.731-6.569c-4.994,9.188-4.968,18.924-3.889,28.782c0.191,1.748,0.483,3.965,2.583,4.341c2.26,0.405,3.138-1.76,3.997-3.366c2.494-4.664,3.501-9.777,4.224-14.958c0.442-3.167,0.762-6.358,1.345-9.499c0.857-4.618,4.592-6.715,8.764-5.54c-0.498,2.643-1.228,5.211-1.427,7.819c-0.623,8.137-0.706,16.271,1.36,24.267c0.225,0.87,0.526,1.733,0.901,2.549c1.543,3.353,4.549,3.971,6.573,0.905c1.864-2.824,3.475-6.14,4.033-9.435c1.319-7.784,1.244-15.673-0.642-23.42c-0.437-1.796-1.257-3.518-2.051-5.202c-0.524-1.111-1.316-2.339-0.086-3.157c1.037-0.688,2.727-1.32,3.706-0.928c1.225,0.491,2.5,1.909,2.895,3.191C217.793,87.964,218.207,90.57,218.268,93.114zM154.734,109.411c6.24-1.846,10.514-7.919,10.646-14.894c0.04-2.104,0.404-4.534-2.131-5.54c-1.646-0.653-3.641,0.973-4.991,3.916C155.885,98.067,155.039,103.583,154.734,109.411z"/><path id="underline" fill="#EFEFEF" d="M8,190c115.125-0.125,259.625-1,328.833-2.667c1-0.024,121.583,3.083,152.167,3.229c0.684,0.003,0.707,0.747,0,0.75c-27.167,0.104-151.667,3.017-153,2.938C298,192,9.636,191.068,8.833,190.667"/></defs><clipPath id="happy-clip"><use xlink:href="#happy-path"  overflow="visible"/></clipPath><clipPath id="ear-clip"><use xlink:href="#ear-path"  overflow="visible"/></clipPath><clipPath id="new-ye-clip"><use xlink:href="#new-ye-path"  overflow="visible"/></clipPath><clipPath id="y-clip"><use xlink:href="#y-path"  overflow="visible"/></clipPath><clipPath id="ye-clip"><use xlink:href="#ye-path"  overflow="visible"/></clipPath><clipPath id="new-clip"><use xlink:href="#new-path"  overflow="visible"/></clipPath><clipPath id="underline-clip"><use xlink:href="#underline"  overflow="visible"/></clipPath><polyline id="happy-stroke" class="stroke-fill"  clip-path="url(#happy-clip)" fill="none" stroke="#4F2525" stroke-width="6" stroke-linejoin="round" stroke-miterlimit="10" points="193.458,17.771 193.479,41.896 206.625,45.542 206.667,18.667 186.917,26.5 195,29.667 204.917,29.625 212.562,48.75 219.344,43.438 228.229,14.438 237.188,43.958 223.375,42.25 216.188,34.625 239.208,34.583 243.875,44.292 249.938,44.062 249.833,20.312 249.833,21.979 258.396,22.417 261.333,25.604 260.042,29.417 255.896,30.562 251.125,30.875 259.833,38.292 270.542,44.542 275.667,42.833 275.708,20.312 275.583,22.167 283.833,22.25 287.042,24.604 286.25,29.083 281.812,30.75 277.688,30.708 296.188,14.438 307.247,33.146 307.375,41.5 304.25,35.75 316.229,17.958  "/><path id="underline-stroke" class="stroke-fill" clip-path="url(#underline-clip)"fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#601B1B" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M494,191.5c0,0-134.006-0.858-164-1s-327.5,0-327.5,0"/><path  id="n-stroke" class="stroke-fill"clip-path="url(#new-clip)" fill="none" stroke="#4F2525" stroke-width="10" stroke-linejoin="round" stroke-miterlimit="10" d="M82.5,100c-11.333-11.833-18.621-46.594,0.917-44.583c20.25,2.083,11.167,80,11.167,80s8.583-75.667,31.917-73.333c21.756,2.176-6.892,58.902,2,69.417c11.417,13.5,17.917-1.75,17.917-1.75"/><path id="ew-stroke" class="stroke-fill" clip-path="url(#new-clip)" fill="none" stroke="#4F2525" stroke-width="9" stroke-linejoin="round" stroke-miterlimit="10" d="M155.042,111.083c5.625,0.042,19.125-14.708,11.833-22c-3.387-3.387-16.441,5.794-16.188,22.979c0.25,16.938,11.438,21.812,15.062,17c2.025-2.688,12.312-40.062,14.688-39.688c1.736,0.274-7.229,36.493-0.625,37.625c6.562,1.125,15.489-38.206,15.688-38.312c8.872-4.745-3.562,22.438,3.375,35.375c1.632,3.043,2.985,5.177,7.5,4.125c15.562-3.625,6.312-48.25,6.312-48.25"/><path id="y-stroke" class="stroke-fill" clip-path="url(#y-clip)"  fill="none" stroke="#4F2525" stroke-width="10" stroke-linejoin="round" stroke-miterlimit="10" d="M245.667,105.833c-5.75-14.5-0.334-55.263,21.5-48.25C280.917,62,254.028,129.803,267,130.25c24.167,0.833,40-62.625,36-62.25s22,105.75-19.625,104"/><path id="ye-stroke" class="stroke-fill" clip-path="url(#ye-clip)"  fill="none" stroke="#4F2525" stroke-width="9" stroke-linejoin="round" stroke-miterlimit="10" d="M286.125,172.125c-4.875,0.125-9.375-2-11.5-14.25s18.5-35.75,24-40.625s16.503-5.341,26.25-6.375c8.25-0.875,16.25-11,15.5-16.375c-1.471-10.542-8.125-8.875-12.375-6.125"/><path id="ear-stroke" class="stroke-fill" clip-path="url(#ear-clip)"  fill="none" stroke="#4F2525" stroke-width="9" stroke-linejoin="round" stroke-miterlimit="10" d="M333.5,87.125c-11.25,4.625-13.25,26.375-10.188,34.812c2.441,6.726,5.553,7.938,8.625,7.938c4.188,0,7.059-6.344,8.188-9c4.438-10.438,4.572-15.379,7.875-24c6.25-16.312,12.625-9.312,12.625-9.312s-8.263,9.086-9.688,16.25c-2.125,10.688-5.125,26.438,2.062,22.125c3.727-2.236,4.544-11.855,7.312-19.625c3.805-10.68,8.938-19.875,8.938-19.875s-4.625,30.812-1.438,37.562s6.846,5.672,8.438,4.5c9.25-6.812,8.562-39.625,3.438-44.062s13.178,10.246,18,5.812c3.875-3.562-0.931,5.241-1.438,11.875c-0.785,10.278-2.375,23.625,2.562,26.312c2.147,1.169,10.688-8.938,12.438-9.604c2.574-0.98,8.726,13.833,10.917,13.833c0.833,0,0.25-7.25,0.25-7.25s11.25-4.167,11.25-4.167l3.75-60.167L424,63.156l0.25,6.094l-0.156,2.594L424,74.25l-2,44"/></svg></div>';
        }
        let osnowflakeContainer = document.getElementById('snowflakeContainer');
        let hoz = document.getElementById('hoz');
        let frmTest = document.getElementById('frmTest');
        let deerNum;
        if (hoz) {
            hoz.innerHTML = '<span><img id="xmasSnow" src="src/img/events/xmas_snow.png" alt="Xmas Snow"></span><span><img id="xmasHat" src="src/img/events/xmas_hat.png" alt="Xmas Hat"></span><span class="deer"></span>' + hoz.innerHTML;
        }
        if (frmTest) {
            frmTest.innerHTML += '<span><img id="xmasHatca" src="src/img/events/xmas_hat.png" alt="Xmas Hat"></span><span class="deer"></span>';
        }
        let oxmasHat = document.getElementById('xmasHat');
        let oxmasHatca = document.getElementById('xmasHatca');
        let odeer = document.getElementsByClassName('deer')[0];
        if (osnowflakeContainer && !nosnow) {
            osnowflakeContainer.style.display = 'inherit';
            setup();
        }
        if (oxmasHat) {
            oxmasHat.style.display = 'inherit';
            deerNum = 'n' + (Math.floor(Math.random() * 10) + 1);
        } else if (oxmasHatca) {
            oxmasHatca.style.display = 'inherit';
            deerNum = 'n' + (Math.floor(Math.random() * 3) + 11);
        }
        if (odeer) {
            odeer.classList.add(deerNum);
            odeer.innerHTML = '<div class="rocking"><div class="head"><div class="horns"><div class="horn horn-left"><div class="line line-one"></div><div class="line"></div><div class="line line-three"></div></div><div class="horn horn-right"><div class="line line-one"></div><div class="line"></div><div class="line line-three"></div></div></div><div class="ears"><div class="ear ear-left"></div><div class="ear ear-right"></div></div><div class="eyes"><div class="eye eye-left"></div><div class="eye eye-right"></div></div><div class="nose"></div></div><div class="dbody"><div class="shadow"></div><div class="hooves"><div class="hoof-one"><div class="line"></div><div class="anim-part"><div class="circle"><div class="circle"><div class="circle"><div class="circle"><div class="circle circle-last"></div></div></div></div></div></div></div><div class="hoof-two"><div class="line-one"></div><div class="line-two"></div></div></div></div><div class="tail"><div class="circle"><div class="circle"><div class="circle"><div class="circle"><div class="circle"></div></div></div></div></div></div></div><div class="legs"><div class="leg-left"><div class="anim-part"><div class="line"></div></div></div><div class="leg-right"><div class="anim-part"><div class="circle"><div class="circle"><div class="circle"><div class="circle"><div class="circle"><div class="circle"><div class="circle"><div class="circle"><div class="circle circle-last"></div></div></div></div></div></div></div></div></div></div></div></div>';
            odeer.onclick = function () { if (oxmasHat) { setTimeout(() => { document.getElementById('new-year').classList.add('pulse'); }, 2890); document.querySelectorAll('#vertical, #hideifrd, #tbar, #ifr0, #ifr1, #ifr2, .nose').forEach((item) => item.classList.add('pulse')); setTimeout(() => { document.querySelectorAll('#new-year, #vertical, #tbar, #ifr0, #ifr1, #ifr2').forEach((item) => { item.classList.remove('pulse'); item.classList.add('pulsedone'); }); }, 7890); setTimeout(() => { document.querySelectorAll('#vertical, #tbar, #hideifrd').forEach((item) => { item.classList.add('pulsedone2'); }); }, 11400); setTimeout(() => { document.getElementsByClassName('nose')[0].classList.remove('pulse'); }, 14490); } else if (oxmasHatca) { window.parent.document.getElementsByClassName('nose')[0].classList.add('pulse'); document.getElementsByClassName('nose')[0].classList.add('pulse'); setTimeout(() => { window.parent.document.getElementsByClassName('nose')[0].classList.remove('pulse'); document.getElementsByClassName('nose')[0].classList.remove('pulse'); }, 14490); }};
            odeer.style.display = 'inline';
        }
    }
}

function moreCh(country) {
    let ifr = country === 'cy' ? 'ifr3' : 'ifr4';
    let channels = country === 'cy' ? ([
        {'title': 'SMILE','url': 'https://www.anacon.org/app/chans/cy/smilecy.html','img': 'src/img/channels/more/smile.png'},
        {'title': 'CYCINEMA','url': 'https://www.anacon.org/app/chans/cy/cycinema.html','img': 'src/img/channels/more/cycinema.png'},
        {'title': 'RIK SAT','url': 'https://tv.rik.cy/live-tv/rik-sat/','img': 'src/img/channels/more/riksat.png'},
        {'title': 'TV MALL','url': 'https://www.anacon.org/app/chans/cy/mall.html','img': 'src/img/channels/more/tvmall.png'},
        {'title': 'FAROS TV1','url': 'https://www.anacon.org/app/chans/cy/faros.html','img': 'src/img/channels/more/faroscy.png'},
        {'title': 'FAROS TV2','url': 'https://www.anacon.org/app/chans/cy/faros2.html','img': 'src/img/channels/more/faroscy.png'},
        {'title': 'VOULI TV','url': 'https://www.anacon.org/app/chans/cy/vouli.html','img': 'src/img/channels/more/voulicy.png'},
        {'title': 'DIASPORA','url': 'https://www.anacon.org/app/chans/cy/diaspora.html','img': 'src/img/channels/more/diaspora.png'},
        {'title': 'GROOVY TV','url': 'https://www.anacon.org/app/chans/cy/groovy.html','img': 'src/img/channels/more/groovy.png'},
        {'title': 'XPLORE','url': 'https://www.anacon.org/app/chans/cy/xplore.html','img': 'src/img/channels/more/xplore.png'},
        {'title': 'PLUTON TV','url': 'https://www.anacon.org/app/chans/cy/pluton.html','img': 'src/img/channels/more/pluton.png'},
        {'title': 'WIXLAR TV','url': 'https://www.anacon.org/app/chans/cy/wixlar.html','img': 'src/img/channels/more/wixlar.png'},
        {'title': 'REBOOT TV','url': 'https://www.anacon.org/app/chans/cy/reboot.html','img': 'src/img/channels/more/reboot.png'},
        {'title': 'EPISTROFI','url': 'https://www.radioepistrofi.com/live.html#comp','img': 'src/img/channels/more/radioepistrofi.png'},
        {'title': 'KINIGI TV','url': 'https://www.anacon.org/app/chans/cy/kinigi.php','img': 'src/img/channels/more/kinigi.png'},
        {'title': 'CYSPORTS','url': 'https://istoikona.com/CYSPORTS','img': 'src/img/channels/more/cysports.png'},
        {'title': 'WEDDING','url': 'https://www.anacon.org/app/chans/cy/wedding.html','img': 'src/img/channels/more/wedding.png'},
        {'title': 'FITNESS TV','url': 'https://www.anacon.org/app/chans/cy/fitness.html','img': 'src/img/channels/more/fitness.png'}
    ]) : ([
        {'title': 'ERT WORLD','url': 'https://webtv.ert.gr/ertworld-live/#content','img': 'src/img/channels/more/ertworld.png'},
        {'title': 'KONTRA','url': 'https://www.anacon.org/app/chans/gr/kontra.html','img': 'src/img/channels/more/kontra.png'},
        {'title': 'STAR K.E.','url': 'https://www.anacon.org/app/chans/gr/starke.html','img': 'src/img/channels/more/starke.png'},
        {'title': 'LYCHNOS','url': 'https://www.anacon.org/app/chans/gr/lixnos.html','img': 'src/img/channels/more/lixnos.png'},
        {'title': 'DIPSO','url': 'https://www.anacon.org/app/chans/gr/dipso.html','img': 'src/img/channels/more/dipso.png'},
        {'title': 'ALERT TV','url': 'https://www.anacon.org/app/chans/gr/alert.html','img': 'src/img/channels/more/alerttv.png'},
        {'title': 'ACTION24','url': 'https://www.anacon.org/app/chans/gr/action.html','img': 'src/img/channels/more/action24.png'},
        {'title': 'IONIAN','url': 'https://www.anacon.org/app/chans/gr/ionian.html','img': 'src/img/channels/more/ionian.png'},
        {'title': 'NEO TV','url': 'https://www.anacon.org/app/chans/gr/neo.html','img': 'src/img/channels/more/new.png'},
        {'title': 'VOULI','url': 'https://www.anacon.org/app/chans/gr/vouli.html','img': 'src/img/channels/more/vouli.png'},
        {'title': 'GR CINEMA','url': 'https://www.anacon.org/app/chans/gr/grcine.html','img': 'src/img/channels/more/gr-cinema.png'},
        {'title': 'FILOPOLI','url': 'https://www.anacon.org/app/chans/gr/filopoli.html','img': 'src/img/channels/more/filopoli.png'},
        {'title': 'ART TV','url': 'https://www.anacon.org/app/chans/gr/art.html','img': 'src/img/channels/more/art.png'},
        {'title': 'DELTA','url': 'https://www.anacon.org/app/chans/gr/delta.html','img': 'src/img/channels/more/delta.png'},
        {'title': 'TV-100','url': 'https://www.anacon.org/app/chans/gr/tv100.html','img': 'src/img/channels/more/tv100.png'},
        {'title': 'ORASI','url': 'https://www.anacon.org/app/chans/gr/orasi.html','img': 'src/img/channels/more/orasi.png'},
        {'title': 'ZOUGLA','url': 'https://www.anacon.org/app/chans/gr/zougla.html','img': 'src/img/channels/more/zougla.png'},
        {'title': 'TOP','url': 'https://www.anacon.org/app/chans/gr/top.html','img': 'src/img/channels/more/top.png'},
        {'title': 'KRITI TV','url': 'https://www.cretetv.gr/live-stream/','img': 'src/img/channels/more/kriti.png'},
        {'title': 'CRETA','url': 'https://www.anacon.org/app/chans/gr/creta.html','img': 'src/img/channels/more/creta.png'},
        {'title': 'CRETA','url': 'https://www.anacon.org/app/chans/gr/cretatv.html','img': 'src/img/channels/more/cretatv.png'},
        {'title': 'RODOPI','url': 'https://www.anacon.org/app/chans/gr/rodopi.html','img': 'src/img/channels/more/rodopi.png'},
        {'title': 'EOE','url': 'https://www.anacon.org/app/chans/gr/eoe.html','img': 'src/img/channels/more/eoe.png'},
        {'title': 'BEST TV','url': 'https://www.anacon.org/app/chans/gr/best.html','img': 'src/img/channels/more/best.png'},
        {'title': 'HLEKTRA','url': 'https://www.anacon.org/app/chans/gr/hlektra.html','img': 'src/img/channels/more/hlektra.png'},
        {'title': 'MPAXALO','url': 'https://www.anacon.org/app/chans/gr/mpaxalo.html','img': 'src/img/channels/more/mpaxalo.png'},
        {'title': 'AXELWOS','url': 'https://www.anacon.org/app/chans/gr/axelos.html','img': 'src/img/channels/more/axelos.png'},
        {'title': 'START TV','url': 'https://www.anacon.org/app/chans/gr/start.html','img': 'src/img/channels/more/start.png'},
        {'title': 'CHANNEL9','url': 'https://www.anacon.org/app/chans/gr/channel9.html','img': 'src/img/channels/more/channel9.png'},
        {'title': 'TV1','url': 'https://www.anacon.org/app/chans/gr/tv1.html','img': 'src/img/channels/more/TV1.png'},
        {'title': 'EXTRA 3','url': 'https://www.anacon.org/app/chans/gr/extra3.html','img': 'src/img/channels/more/extragr.png'},
        {'title': 'THRAKINET','url': 'https://www.anacon.org/app/chans/gr/thraki.html','img': 'src/img/channels/more/thraki.png'},
        {'title': 'NETTVT','url': 'https://www.anacon.org/app/chans/gr/toronto.html','img': 'src/img/channels/more/netvt.png'},
        {'title': 'TRT TV','url': 'https://www.anacon.org/app/chans/gr/trt.html','img': 'src/img/channels/more/trt.png'},
        {'title': 'MONTREAL','url': 'https://www.anacon.org/app/chans/gr/montreal.html','img': 'src/img/channels/more/montreal.png'},
        {'title': 'HIGH TV','url': 'https://www.anacon.org/app/chans/gr/high.html','img': 'src/img/channels/more/high.png'},
        {'title': 'CORFU TV','url': 'https://www.anacon.org/app/chans/gr/corfu.html','img': 'src/img/channels/more/corfu.png'},
        {'title': 'ENA TV','url': 'https://www.anacon.org/app/chans/gr/ena.html','img': 'src/img/channels/more/ena.png'},
        {'title': 'DIKTYO','url': 'https://www.anacon.org/app/chans/gr/diktio.html','img': 'src/img/channels/more/diktio.png'},
        {'title': 'STAR B.E.','url': 'https://www.startvfm.gr/live/#content_4710','img': 'src/img/channels/more/starbe.png'},
        {'title': 'NG TV','url': 'https://www.anacon.org/app/chans/gr/ng.html','img': 'src/img/channels/more/ng.png'},
        {'title': 'CANNALI','url': 'https://www.anacon.org/app/chans/gr/cannali.html','img': 'src/img/channels/more/cannali.png'},
        {'title': 'MESSINIA','url': 'https://www.anacon.org/app/chans/gr/messinia.html','img': 'src/img/channels/more/mesinia.png'},
        {'title': 'NRG91','url': 'https://www.anacon.org/app/chans/gr/nrg91.html','img': 'src/img/channels/more/nrg91.png'},
        {'title': 'GOLD','url': 'https://www.anacon.org/app/chans/gr/gold.html','img': 'src/img/channels/more/gold.png'},
        {'title': 'XALASTRA','url': 'https://www.anacon.org/app/chans/gr/xalastra.html','img': 'src/img/channels/more/xalastra.png'},
        {'title': 'SAMIAKI','url': 'https://www.anacon.org/app/chans/gr/samiaki.html','img': 'src/img/channels/more/samiaki.png'},
        {'title': 'KIDS TV','url': 'https://www.anacon.org/app/chans/gr/cartoon.html','img': 'src/img/channels/more/kids-tv.png'},
        {'title': 'MESOGEIOS','url': 'https://www.anacon.org/app/chans/gr/mesogeios.html','img': 'src/img/channels/more/mesogeios.png'},
        {'title': 'AIGAIO TV','url': 'https://www.anacon.org/app/chans/gr/aigaio.html','img': 'src/img/channels/more/aigaio.png'},
        {'title': 'NEA TV','url': 'https://www.anacon.org/app/chans/gr/nea.html','img': 'src/img/channels/more/nea.png'},
        {'title': 'ALFA DR.','url': 'https://www.anacon.org/app/chans/gr/alfadramas.html','img': 'src/img/channels/more/alfadramas.png'},
        {'title': 'EBS','url': 'https://www.anacon.org/app/chans/gr/ebs.html','img': 'src/img/channels/more/ebs.png'},
        {'title': 'EBS PLUS','url': 'https://www.anacon.org/app/chans/gr/ebsplus.html','img': 'src/img/channels/more/ebsplus.png'},
        {'title': 'WZRA','url': 'https://www.anacon.org/app/chans/gr/greekvoice.html','img': 'src/img/channels/more/greekvoice.png'},
        {'title': 'ELLINIKOS','url': 'https://www.anacon.org/app/chans/gr/ellinikos.html','img': 'src/img/channels/more/ellinikos.png'},
        {'title': 'TINOS','url': 'https://www.anacon.org/app/chans/gr/tinos.html','img': 'src/img/channels/more/tinos.png'},
        {'title': 'DIAVATA','url': 'https://www.anacon.org/app/chans/gr/diavata.html','img': 'src/img/channels/more/diavata.png'},
        {'title': 'PRIGGIPESA','url': 'https://www.anacon.org/app/chans/gr/pringipesa.html','img': 'src/img/channels/more/priggipesa.png'},
        {'title': 'IRIDA','url': 'https://www.anacon.org/app/chans/gr/irida.html','img': 'src/img/channels/more/irida.png'},
        {'title': 'PLP','url': 'https://www.anacon.org/app/chans/gr/plp.html','img': 'src/img/channels/more/plp.png'},
        {'title': 'EPIRUS TV1','url': 'https://www.anacon.org/app/chans/gr/epirus.html','img': 'src/img/channels/more/epirus.png'},
        {'title': 'ONE TV','url': 'https://www.anacon.org/app/chans/gr/one.html','img': 'src/img/channels/more/onetv.png'},
        {'title': 'ATTICA TV','url': 'https://www.anacon.org/app/chans/gr/attica.html','img': 'src/img/channels/more/attica.png'},
        {'title': 'TV SUPER','url': 'https://www.anacon.org/app/chans/gr/tvsuper.html','img': 'src/img/channels/more/tvsuper.png'},
        {'title': 'NEW TV','url': 'https://www.anacon.org/app/chans/gr/new.html','img': 'src/img/channels/more/newtv.png'},
        {'title': 'LAMPSI','url': 'https://www.anacon.org/app/chans/gr/lampsi.html','img': 'src/img/channels/more/lampsi.png'},
        {'title': 'MAGIC TV','url': 'https://www.anacon.org/app/chans/gr/magic.html','img': 'src/img/channels/more/magic.png'},
        {'title': 'LEPANTO','url': 'https://lepantortv.gr/live-tv.html#elx_article_page_19','img': 'src/img/channels/more/lepando.png'},
        {'title': 'BLUE SKY','url': 'https://www.anacon.org/app/chans/gr/bluesky.html','img': 'src/img/channels/more/bluesky.png'},
        {'title': 'KANALI 6','url': 'https://www.anacon.org/app/chans/gr/kanali6.html','img': 'src/img/channels/more/kanali6.png'},
        {'title': 'FOX TV','url': 'https://www.anacon.org/app/chans/gr/fox.html','img': 'src/img/channels/more/foxtv.png'}
    ]);
    function getDataByString(arr, str) {
        let keys = str.split('.');
        let tmp = arr;
        for (let i = 0; i < keys.length; i++) {
            if (tmp[keys[i]] == undefined) {
                return '';
            } else {
                tmp = tmp[keys[i]];
            }
        }
        return tmp;
    }
    let item_template = '<div class="chcontainer"><a href="{{url}}" target="_blank"><img src="{{img}}"/><br>{{title}}</a></div>';
    let html = '';
    for (let i = 0; i < channels.length; i++) {
        let channel = channels[i];
        html += item_template.replace(/{{(.*?)}}/ig, function (k, s) { return getDataByString(channel, s); });
    }
    html = '<div class="row channels-collection">' + html + '</div>';
    document.getElementById(ifr).contentWindow.document.body.innerHTML = html;
}