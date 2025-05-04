document.addEventListener('DOMContentLoaded', ()=>{


document.getElementById('btn').addEventListener("click", ()=>{

    const domain = document.getElementById("url").value.trim();
    const status = document.getElementById("status")
    const resultDiv = document.getElementById('result');
    const delBtn = document.getElementById('delBtn');

    if(!domain){
        status.textContent = "please enter domain";
        return;
    }

    chrome.history.search({text:domain, maxResults:10000, startTime:0}, (result)=>{
        const matchingUrl = result.filter(item => item.url.includes(domain))

        if(!matchingUrl || matchingUrl.length == 0){
            resultDiv.innerHTML = "<p>No matching url found</p>"
            return;
        }

        console.log(`total ${matchingUrl.length} item found`);
        

        status.textContent = `total ${matchingUrl.length} items found`

        

        matchingUrl.forEach((item)=>{
            const div = document.createElement("div");
            div.className = "list"
            div.innerHTML = `<div>${item.url}</div>`
            resultDiv.appendChild(div)
        })

        delBtn.style.display = 'block'

        delBtn.onclick = () =>{
            matchingUrl.forEach((item)=>{
                chrome.history.deleteUrl({url : item.url})
            })
            
            resultDiv.innerHTML='';
            status.textContent = `deleteing total of ${matchingUrl.length} items`
            delBtn.style.display= 'none';
        }

       


    })

})

})

