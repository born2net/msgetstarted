/////////////////
// IFrame
////////////////

var m_iframeMap = {};

function craeteIFrame(iframeId)
{
    //console.log('craeteIFrame');
    myDiv = document.createElement('DIV');
    document.body.appendChild(myDiv)
    myDiv.style.position="absolute"
    m_iframeMap[iframeId] = myDiv;
}

function distroyIFrame(iframeId)
{
    //console.log('distroyIFrame');
    var myFrame = m_iframeMap[iframeId];
    document.body.removeChild(myFrame);
    delete m_iframeMap[iframeId];
}

function onActive()
{
    //console.log('onActive');
    for(var iframeId in m_iframeMap)
    {
        var myFrame = m_iframeMap[iframeId]
        if (myFrame.style.visibility="visible")
        {
            myFrame.style.visibility="hidden";
            myFrame.style.visibility="visible";
        }
    }
}

function moveIFrame(iframeId, x,y,w,h)
{
    //console.log('moveIFrame');
    var frameRef = m_iframeMap[iframeId];
    frameRef.style.left=x;
    frameRef.style.top=y;
    frameRef.firstChild.width=w;
    frameRef.firstChild.height=h;
}

function hideIFrame(iframeId)
{
    //console.log('hideIFrame');
    m_iframeMap[iframeId].style.visibility="hidden";
}

function showIFrame(iframeId)
{
    //console.log('showIFrame');
    m_iframeMap[iframeId].style.visibility="visible";
}

function loadIFrame(iframeId, url)
{
    //console.log('loadIFrame');
    m_iframeMap[iframeId].innerHTML = "<iframe marginheight='0' marginwidth='0' scrolling='no' src='" + url + "'frameborder='0'></iframe>";
}

