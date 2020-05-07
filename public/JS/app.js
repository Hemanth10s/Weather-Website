const weatherform=document.querySelector('form')
const searchLoc=document.querySelector('input')
const ermes=document.getElementById('error')
const message=document.getElementById('message')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const search=searchLoc.value
    ermes.textContent='Loading...'
    message.textContent=''
    fetch('/weather?address='+search).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            ermes.textContent=data.error
        }else{
            ermes.textContent=data.location
            message.textContent=data.Forecast
        }
    })
})
})