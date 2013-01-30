var movies = [		
    { Name: "The Red Violin", ReleaseYear: "1998" },			
    { Name: "Eyes Wide Shut", ReleaseYear: "1999" },			
    { Name: "The Inheritance", ReleaseYear: "1976" }
];
		
		 

function load(){
    // Asynchronously load the template definition file.
    $.get('_twitter.tmpl.html', function(template) {
    // Inject all those templates at the end of the document.
   // $('body').append(templates);
  // $('#div').tmpl(template, person).appendTo('body');
     console.log('append to body');
    // $('#movieTemplate').tmpl(template).appendTo('#results')
    // $("#movieTemplate").tmpl(movies).appendTo( "#results" );
      // Select the newly injected invoiceTemplate and use it
      //  render the invoice data.
     $('#results').tmpl(template, 'movies').appendTo('results');
    });
}

load();