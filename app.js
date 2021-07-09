const $modaltext = $('modal-textbox');

$(() => {
  $('#input-button').click((e) => {
    searchBar(e);
    // console.log(input);
    $.ajax(
      {
        url: `https://developer.nps.gov/api/v1/parks?`,
        type: "GET",
        data:
        {
            "api_key": 'JJzpELBL8pfSmGcbjMHf6N9kd10CvM5Uxbw8pAvX',
            "limit": "50",
            "stateCode": `${input}`,
        }
      //end of request
    }).then((object) => {
      const parkList = object.data;
      parkList.forEach((i) => {
        createCard(i);
      })
      //open modal
      $('.detailBtn').on('click',(e) => {
        openModal();
        console.log(parkList[$(e.target).val()]);
        $('#modalHeader').text(parkList[$(e.target).val()].name);
        // $('#modalAddress').text(parkList[$(e.target).val()].addresses[0].city);
        $('#modalDescription').text(parkList[$(e.target).val()].description);
        $('#modalweatherInfo').text(parkList[$(e.target).val()].weatherInfo);
        $('#modalDirections').text(parkList[$(e.target).val()].directionsInfo);
        $('#modalHours').text(parkList[$(e.target).val()].operatingHours[0].description);
        // $('#modalPictures').attr('src', parkList[$(e.target).val()].images[Math.floor(Math.random() * parkList[$(e.target).val()].images.length)].url, 'alt', `${parkList[$(e.target).val()].url}`)






        $('.closeBtn').on('click', closeModal);


      });




    },
    //bad request
    () => {
      console.log("Error");
    }
    //end then
    );
  $('#input-box').val('');
  $('#Main').empty();
  //end of event listener
  })
  // end of document ready
})

let input = '';
const searchBar = (e) => {
  $('#Banner').css('padding-top', '25px');
  if ($('#input-box').val() === ""){
    input = ''
  }
  input = $("#input-box").val();
}

let index = 0;
const createCard = (i) => {
  // console.log(i);
  //park list
  const $parkInfo = $('<div>').addClass(`parkInfo park${index}`)
  .appendTo('#Main');
  //adding images
  const $parkImg = $('<div>').addClass('parkImg').appendTo($parkInfo);
  const randomPhoto = Math.floor(Math.random() * i.images.length);
  const $img = $('<img>').attr('src',i.images[randomPhoto].url, 'alt', `${i.url}`).appendTo($parkImg);
  //card footer including name/description/...
  const $cardFooter = $('<div>').addClass('cardFoot').appendTo($parkInfo);
  const $name = $('<h4>').text(i.name).addClass('parkName').appendTo($cardFooter);
  const $description = $('<p>').text(i.description).addClass('parkDescription').appendTo($cardFooter);
  //icon container for phone web and more details
  const $iconContainer = $('<div>').addClass('icons').appendTo($cardFooter);
  const $number = $('<a>').attr('href',`#`).addClass('parkNumber').html(`<img src="./img/phone.png" alt="">`).appendTo($iconContainer);
  //details button
  const $moreDetails = $('<button>').attr('type', 'button').addClass('detailBtn').attr('value', `${index++}`).text('...').appendTo($iconContainer);
  //web url
  const $url = $('<a>').attr('href', `${i.url}`).addClass('parkUrl').html(`<img src="./img/url.png" alt="">`).appendTo($iconContainer);

  $('#Main').css('background-color', '#E5E5E5')
  $('#Banner').css('margin-top', '18px');
}

const openModal = () => {
  $('#modal').css('display','inline-block');
}
const closeModal = () => {
  $('#modal').css('display', 'none');
}


//
