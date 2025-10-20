
const div = document.getElementById("hide")

document.getElementById("entry").addEventListener("click", function(){
    console.log("Clicked");
    div.style.display = "block";
    document.getElementById("entry").style.display = "none";
});


document.getElementById("enter").addEventListener("click", () => {
    console.log("entered stuff");
    div.style.display = "none";
    document.getElementById("entry").style.display = "block";



    //setting the headings and stuff of the new post
    const heading = document.getElementById("heading").value;
    const paragraph = document.getElementById("text").value;
    const date = document.getElementById("date").value;
    savecard(heading, date, paragraph);




})


function addstuff(heading, paragraph, date){
    const newDiv = document.getElementById("card");
    const cloned = document.createElement("div");
    cloned.innerHTML = newDiv.innerHTML;


    cloned.querySelector("h2").textContent = heading;
    cloned.querySelector("p").textContent = paragraph;
    cloned.querySelector("h5").textContent = date;

    cloned.classList = "card"
    document.getElementById("my-div").insertBefore(cloned, document.getElementById("my-div").firstChild)
}



async function initload() {
    const res = await fetch('https://bckend-dbam.onrender.com/cards');
    const data = await res.json();
    
    data.cards.forEach(c => {
        addstuff(c.heading, c.content, c.date);
    });

}

async function savecard(heading, date, content) {
    const res = await fetch('https://bckend-dbam.onrender.com/cards', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            heading: heading,
            date: date,
            content: content
        })
    });

    const data = await res.json();

    // Optionally display it immediately on the frontend
    addstuff(heading, content, date)
}


window.onload = initload()
