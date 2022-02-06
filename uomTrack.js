(function(){
  'use strict';

  // Data declaration
  const imagePrefix = 'https://hatscripts.github.io/circle-flags/flags/';
  var athletes = [
    {
      position: 1,
      country: 'ITA',
      countryPrefix: 'it',
      name: 'Lamont Marcell Jacobs',
      age: 27,
      result: 9.8,
      personalBest: 9.8,
      notes: '-' 
    },
    {
      position: 2,
      country: 'USA',
      countryPrefix: 'us',
      name: 'Fred Kerley',
      age: 26,
      result: 9.84,
      personalBest: 9.84,
      notes: '-' 
    },
    {
      position: 3,
      country: 'CAN',
      countryPrefix: 'ca',
      name: 'Andre De Grasse',
      age: 27,
      result: 9.89,
      personalBest: 9.89,
      notes: '-' 
    },
    {
      position: 4,
      country: 'RSA',
      countryPrefix: 'za',
      name: 'Akani Simbine',
      age: 28,
      result: 9.93,
      personalBest: 9.84,
      notes: '-' 
    },
    {
      position: 5,
      country: 'USA',
      countryPrefix: 'us',
      name: 'Ronnie Baker',
      age: 28,
      result: 9.95,
      personalBest: 9.83,
      notes: '-' 
    },
    {
      position: 6,
      country: 'CHN',
      countryPrefix: 'cn',
      name: 'Bingtian Su',
      age: 32,
      result: 9.98,
      personalBest: 9.83,
      notes: '-' 
    },
    {
      position: 7,
      country: 'NGR',
      countryPrefix: 'ng',
      name: 'Enoch Adegoke',
      age: 21,
      result: '',
      personalBest: 9.98,
      notes: 'Didn\'t finish' 
    },
    {
      position: 8,
      country: 'GBR',
      countryPrefix: 'gb',
      name: 'Zharnel Hughes',
      age: 26,
      result: '',
      personalBest: 9.91,
      notes: 'Disqualified' 
    }
  ];
    
  // Elements
  var table = document.getElementById('table');
  var tableBody = document.getElementById('table-body');
  const team = document.getElementById('team');
  const athlete = document.getElementById('athlete');
  const age = document.getElementById('age');
  const results = document.getElementById('results');
  const personal = document.getElementById('personal');
  var copyButton = document.getElementsByClassName('copyButton');
  var deleteButton = document.getElementsByClassName('deleteButton');

  // OnLoad function 
  window.onload = function() {
    createTable();

    for(var i=0; i<copyButton.length; i++) {
      copyButton[i].addEventListener('click', function(){
        var rowParent = this.parentNode.parentNode.parentNode;
        addEvents(rowParent);
      });
    }
    for(var i=0; i<deleteButton.length; i++) {
      deleteButton[i].addEventListener('click', function(){
        var rowParent = this.parentNode.parentNode.parentNode;
        deleteEvent(rowParent);
      })
    }
    calculateScores(tableBody);
  }

  // Adds duplicate and delete event 
  function addEvents(btn){
    var clone = btn.cloneNode(true);
    insertAfter(clone, btn);
    // Add copy event listener
    var tempCopyButton = clone.children[7].getElementsByClassName('copyButton');
    tempCopyButton[0].addEventListener('click', () =>{
      addEvents(clone);
    })

    // Add delete event listener
    var tempDelButton = clone.children[7].getElementsByClassName('deleteButton');
    tempDelButton[0].addEventListener('click', function(){
      deleteEvent(clone);
    })
  }

  // Delete Event
  function deleteEvent(parent){
    if(tableBody.children.length < 2){
      alert('You can not delete the last element!');
    } else {
      parent.remove();
    }
  }

  // Helpers
  function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  }

  // Calculate the Best, worst and average time
  function calculateScores(tableBody){
    var bestScore = document.getElementById('best');
    var worstScore = document.getElementById('worst');
    var avgScore = document.getElementById('avg');
    
    var chArray =  tableBody.children;
    var totalRows = tableBody.children.length;
    var arrayUpdated = [];

    var total = 0.0;
    var count = 0;
    var best, worst;
    for(var i=0; i < totalRows; i++){
      var localRes = chArray[i].cells[4].innerHTML;
     
      if (localRes != ''){
        var floatRes = parseFloat(localRes);
        arrayUpdated.push(floatRes);
        total += floatRes;
        count ++;
      }
    }

    var best = Math.min(...arrayUpdated);
    var worst = Math.max(...arrayUpdated);
    var avg = total / count;
    
    bestScore.innerHTML = best;
    worstScore.innerHTML = worst;
    avgScore.innerHTML = avg;

  }

  // Actions
  team.addEventListener('click', ()=>{
    sortTable(1);
  });
  athlete.addEventListener('click', ()=>{
    sortTable(2);
  });
  age.addEventListener('click', ()=>{
    sortTable(3);
  });
  results.addEventListener('click', ()=>{
    sortTable(4);
  });
  personal.addEventListener('click', ()=>{
    sortTable(5);
  });
  tableBody.addEventListener('input', ()=>{
    calculateScores(tableBody);
  });

  // Create table
  function createTable(){

    athletes.forEach((athlete) =>{

      var tr = document.createElement('tr');

        // td1, Position table data creation
        var td1 = document.createElement('td');
        td1.contentEditable = 'true';
        var text1;

        var a1 = document.createElement('a');
        a1.classList.add('custom-rank')
 
        var model = setRankSymbols(athlete);

        if(model.flag){
          text1 = document.createTextNode(model.text);
          a1.id = model.id;
          a1.appendChild(text1);
          td1.appendChild(a1);
        }else{
          text1 = document.createTextNode(athlete.position);
          td1.appendChild(text1);
        }

        // td2, Image table data Creation
        var td2 = document.createElement('td');
        td2.contentEditable = 'true';
        var img2 = document.createElement('img');
        
        img2.src = imagePrefix + athlete.countryPrefix +'.svg';
        img2.width = 20;

        var text2 = document.createTextNode(athlete.country);
        
        td2.appendChild(img2);
        td2.appendChild(text2);

        // td3, Athlete name tabe data creation
        var td3 = document.createElement('td');
        td3.contentEditable = 'true';
        var text3 = document.createTextNode(athlete.name);
        td3.appendChild(text3);

        // td4, Age table data creation
        var td4 = document.createElement('td');
        td4.contentEditable = 'true';
        var text4 = document.createTextNode(athlete.age);
        td4.appendChild(text4);

        // td5, Time table data creation
        var td5 = document.createElement('td');
        td5.contentEditable = 'true';
        var text5 = document.createTextNode(athlete.result);
        td5.appendChild(text5);

        // td6, Best Time table data creation
        var td6 = document.createElement('td');
        td6.contentEditable = 'true';
        var text6 = document.createTextNode(athlete.personalBest);
        td6.appendChild(text6);

        // td7, Notes table data creation
        var td7 = document.createElement('td');
        td7.contentEditable = 'true';
        var text7 = document.createTextNode(athlete.notes);
        td7.appendChild(text7);

        // td8, Actions
        var td8 = document.createElement('td');
        var insideDiv = document.createElement('div');
        insideDiv.classList.add('centerAlign');
        td8.appendChild(insideDiv);
        var copyButton = document.createElement('button');  
        copyButton.innerHTML = '<i class="far fa-copy"></i>';
        copyButton.classList.add('copyButton');

        var deleteButton = document.createElement('Button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.classList.add('deleteButton');
        
        insideDiv.appendChild(copyButton);
        insideDiv.appendChild(deleteButton);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);

        tableBody.appendChild(tr);

    })
    console.log('Initial Table loaded!');
  }

  // Calculates rank
  function setRankSymbols(athlete){
    var model = {id:'', text:'', flag: false};

    switch(athlete.position){
      case 1:
        model.id = 'gold';
        model.text = 'G';
        model.flag = true;
        break;
      case 2:
        model.id = 'silver';
        model.text = 'S';
        model.flag = true;
        break;
      case 3:
        model.id = 'bronze';
        model.text = 'B';
        model.flag = true;
        break;
    }

    if (athlete.result === ''){
      model.text = '-';
      model.flag = true;
    }

    return model;
  }

  // Table sorting
  function sortTable(n) {
      var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      
      switching = true;
      // Set the sorting direction to ascending:
      dir = 'asc';
      /* Make a loop that will continue until
      no switching has been done: */
      while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
          // Start by saying there should be no switching:
          shouldSwitch = false;
          /* Get the two elements you want to compare,
          one from current row and one from the next: */
          x = rows[i].getElementsByTagName('TD')[n];
          y = rows[i + 1].getElementsByTagName('TD')[n];
          /* Check if the two rows should switch place,
          based on the direction, asc or desc: */
          if (dir == 'asc') {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == 'desc') {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /* If a switch has been marked, make the switch
          and mark that a switch has been done: */
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          // Each time a switch is done, increase this count by 1:
          switchcount ++;
        } else {
          /* If no switching has been done AND the direction is "asc",
          set the direction to "desc" and run the while loop again. */
          if (switchcount == 0 && dir == 'asc') {
            dir = 'desc';
            switching = true;
          }
        }
      }
    }
}());