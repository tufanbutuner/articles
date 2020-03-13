var xhr = new XMLHttpRequest();
var json = document.getElementById("json").innerHTML;
xhr.open('GET', json, true);
xhr.send();
xhr.onreadystatechange = function()
{
    if (this.readyState == 4 && this.status == 200)
    {
        var r = JSON.parse(xhr.responseText);
        renderHTML(r);
    }
}

const rankingForm = document.getElementById("rankingForm");
rankingForm.addEventListener("submit", function(e)
{
    e.preventDefault();
    console.log("form submitted");
});

function renderHTML(r)
{
    var title = r.title;
    document.getElementById("title").innerHTML = title;
    //console.log(r);
    //console.log("-----------------------------------------------------------------")

    // var paragraph = r.paragraph;
    // document.getElementById("paragraph").innerHTML = paragraph;

    // document.getElementById("content").innerHTML += 
    // `

    // `

    for (var i = 0; i < r.body.length; i++)
    {
        //console.log(r.body[i]);
        var type = r.body[i].type; 
        var model = r.body[i].model;
        if (type == "heading")
        {
            // console.log(model.text); // h1
            document.getElementById("content").innerHTML += 
            `<h1>${model.text}</h1>`
        }
        if (type == "paragraph")
        {
            // console.log(model.text); // p
            document.getElementById("content").innerHTML += 
            `<p>${model.text}</p>`
        }
        if (type == "image")
        {
            // console.log(model.altText); // couple stuff
             document.getElementById("content").innerHTML += 
             `
             <img src=${model.url} alt="${model.altText}" 
             height="${model.height}" width="${model.width}" ></img>
             `
        }
        if (type == "list")
        {
             //console.log(model.type); // couple stuff
             if(model.type == "unordered")
             {
                 for (j=0; j < model.items.length; j++)
                 {
                    document.getElementById("content").innerHTML += 
                    `<ul>${model.items[j]}</ul>`
                 }
             }
        } 
    }
}
