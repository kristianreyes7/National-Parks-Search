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
      console.log(object.data);
      const parkList = object.data;
      parkList.forEach((i) => {
        createCard(i);
        $('.parkNumber').on('mouseenter',() => {
          $('.pNumber').css('display', 'inherit').css('border', '2px solid black').css('padding','5px'); 
        }).on('mouseleave', () => {
          $('.pNumber').css('display', 'none');
        })
      })
      //open modal
      $('.detailBtn').on('click',(e) => {
        openModal();
        createModal(e);
        $('.closeBtn').on('click', closeModal);
        $('#modal').on('click', closeModal);
      });




      const createModal = (e) => {
        let pIndex = $(e.target).val();
        const activityArray = [];
        parkList[pIndex].activities.forEach((i) => {
          activityArray.push(i.name);
        })
        const priceArray = [];
        parkList[pIndex].entranceFees.forEach((i) => {
          priceArray.push(i.title+": "+i.cost);
        })
        const modalAddress = parkList[pIndex].addresses[0].line1 + " "+ parkList[pIndex].addresses[0].city+","+parkList[pIndex].addresses[0].stateCode+" "+parkList[pIndex].addresses[0].postalCode;

        $('#modalHeader').text(parkList[pIndex].name);
        $('#modalAddress').text(modalAddress);
        $('#modalDescription').text(parkList[pIndex].description);
        $('#modalweatherInfo').text(parkList[pIndex].weatherInfo);
        $('#modalDirections').text(parkList[pIndex].directionsInfo);
        $('#modalHours').text(parkList[pIndex].operatingHours[0].description);
        activityArray.forEach((i) => {
          const $activityList = $('<li>').text(i).appendTo('#modalActivities');
        })
        priceArray.forEach((i) => {
          const $priceList = $('<li>').text(i).appendTo('#modalCost');
        })
      }
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
  const $phonePopUp = $('<p>').addClass('pNumber').text(i.contacts.phoneNumbers[0].phoneNumber).appendTo($cardFooter);
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
