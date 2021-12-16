// https://picsum.photos

function generateUrl() {
    // Retornar url con id aleatorio
    // Ej: https://picsum.photos/id/456/info
    let id = Math.round(Math.random()*500);
    console.log(`https://picsum.photos/id/${id}/info`);
    return `https://picsum.photos/id/${id}/info`;
}

function renderPic(data) {
    // Manipulamos el DOM para agregar las imágenes
    let div = $("<div></div>");
    div.addClass("card");

    let img = $("<img></img>");
    img.attr("src", data.download_url);
    img.addClass("card-img");
    div.append(img);

    let author = $(`<h3></h3>`);
    author.addClass("card-title");
    let author_url = $(`<a target="_blank">${data.author}</a>`);
    author_url.attr("href", data.url);
    author.append(author_url);
    
    div.append(author);

    $("#pic-container").append(div);
}

function getPic() {
    // Consumir la API
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: generateUrl(),
        success: function (data) {
            renderPic(data);
        },
        error: function () {getPic()}  // Si un id no existe, se intenta con otro
    });
}

$(document).ready(function() {
    // Desplegamos 9 imágenes
    for (let i = 0; i < 4; i++) {
        getPic();
    }

    $("#btn").click(function() {location.reload()});
});