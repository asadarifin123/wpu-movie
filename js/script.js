function cariFilm() {
    $('#daftar-film').html('');

    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : '33d23ad8',
            's': $('#search-input').val()
        },
        success: function(result) {

            

            if (result.Response == "True"){
                let film = result.Search;
                
                $.each(film, function (i, data) {
                    $('#daftar-film').append(`
                        <div class="col-md-4">
                            <div class="card" style="width: 18rem;">
                                <img src="`+ data.Poster +`" class="card-img-top">
                                <div class="card-body">
                                <h5 class="card-title">` + data.Title + `</h5>
                                <h6 class="card-subtitle mb-2 text-muted">` + data.Year + `</h6>
                                <a href="#" class="card-link lihat-data" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">Lihat Detil</a>
                                </div>
                            </div>
                        </div>
                    `)
                });

                $('#search-input').val('');
                    
            }
            else {
                $('#daftar-film').html(`
                <div class="col">
                <h1 class="text-center">`+ result.Error +`<h1>
                </div>
                `)
            }
        }
    });
}

$('#search-button').on('click', function () {
    cariFilm(); 
});

$('#search-input').on('keyup', function (e) {
    if (e.keyCode === 13) {
        cariFilm();
    }
});

$('#daftar-film').on('click', '.lihat-data', function () {
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : '33d23ad8',
            'i' : $(this).data('id')
        },

        success: function(movie) {

            if (movie.Response == "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ movie.Poster +`" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                <li class="list-group-item">`+ movie.Title +`</li>
                                <li class="list-group-item">`+ movie.Year +`</li>
                                <li class="list-group-item">`+ movie.Actors +`</li>
                                <li class="list-group-item">`+ movie.Language +`</li>
                                <li class="list-group-item">`+ movie.Plot +`</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    })
});