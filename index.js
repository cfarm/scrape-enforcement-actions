const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.consumerfinance.gov/policy-compliance/enforcement/actions/'

let dataFileContents = "Hello World!";

// The absolute path of the new file with its name
let dataFilePathName = "data.json";

axios.get( url )
    .then( response => {
        console.log( response.data );
        getData(response.data)
    } )
    .catch( error => {
        console.error( error );
    } );

let getData = html => {
  data = [];
  const $ = cheerio.load( html );
  $( '.o-post-preview_title' ).each((i, elem) => {
    data.push({
      title : $( elem ).text()
    });
  });
  console.log( data );
  let dataText = JSON.stringify( data );
createDataFile( dataFilePathName, dataText );
}

let createDataFile = ( filePath, fileContents ) => {
    fs.writeFile( filePath, fileContents, ( err ) => {
        if ( err ) throw err;
        console.log( "The file was succesfully saved!" );
    }); 
}
