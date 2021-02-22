App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  // result = false;

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
 
     // Modern dapp browsers...
      if (window.ethereum) {
        App.web3Provider = window.ethereum;
        try {
          // Request account access
          await window.ethereum.enable();
        } catch (error) {
          // User denied account access...
          console.error("User denied account access")
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = window.web3.currentProvider;
      }
      // If no injected web3 instance is detected, fall back to Ganache
      else {
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      }
      web3 = new Web3(App.web3Provider);

      return App.initContract();
  },

  initContract: function() {
   $.getJSON('GradePortal.json', function(data) {
  // Get the necessary contract artifact file and instantiate it with @truffle/contract
     var GradePortal = data;
     App.contracts.GradePortal = TruffleContract(GradePortal);

  // Set the provider for our contract
     App.contracts.GradePortal.setProvider(App.web3Provider);

  return App.render();
});

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  listenForEvents: function () {
    App.contracts.Election.deployed().then(function (instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function (error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();
      });
    });
  },

  render: function() {
    var GradePortalMain;

    var loader = $("#loader");
    var content = $("#content");
    loader.show();
    content.hide();
    // Load account data
    
    web3.eth.getCoinbase(function (err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html(" Current Account: " + account);
      }
    });

    // Load Student data
    App.contracts.GradePortal.deployed().then(function (instance) {
      GradePortalMain = instance;
      return GradePortalMain.noOfStudents();
    }).then(function (noOfStudents) {
      var studentResults = $("#studentResults");
      studentResults.empty();
      
      console.log(noOfStudents);
      
      for (var i = 1; i <= noOfStudents; i++) {
        GradePortalMain.students(i).then(function (student) {
          var sId = student[0];
          var rollNo = student[2];
          var name = student[3];
          
          console.log( "All student info displayed" + rollNo);
          
          var studentInfo = `<tr><th>${sId}</th><td>${name}</td><td>${rollNo}</td></tr>`
          studentResults.append(studentInfo);
        });
      }

        return GradePortalMain.students(0);
      }).then(function () { 

        // $('form').hide();
        loader.hide();
        content.show();

      }).catch(function (error) {
        console.warn(error);
      });
  },


  addStudentFunc: function () {

    var addrs = $('#address').val();
    var name = $('#name').val();
    var rollNo = $('#rollno1').val();
    var privateKey = $('#privateKey').val();
    
    privateKey = publicKeyByPrivateKey(privateKey);

    console.log(`${rollNo} : Name - ${name} student is added.`);

    App.contracts.GradePortal.deployed().then(function (instance) {
      return instance.addStudent(addrs, name, rollNo,privateKey, { from: App.account });
    }).then(function (result) {
        // $("#content").hide();
        // $("#loader").show();
      }).catch(function (err) {
      console.error(err);
    });
  },

  setGradeFunc: function () {

    var rollNo = $('#rollno').val();
    var grade = $('#grade').val();
    console.log(grade, rollNo);
    App.contracts.GradePortal.deployed().then(function (instance) {
      return instance.setGrade(rollNo, grade, { from: App.account });
    }).then(function () {
      $("#content").hide();
      $("#loader").show();
    }).catch(function (err) {
      console.error(err);
    });
  },

  showGradeFunc: function () {

    var rollNo = $('#rollno2').val();
    var privateKey = $('#privateKey').val();
    privateKey = publicKeyByPrivateKey(privateKey);
    console.log(rollNo);

    App.contracts.GradePortal.deployed().then(function (instance) {
      return instance.showGrade(privateKey, { from: App.account });
    }).then(function (gradeReturn) {

      var grade = gradeReturn;
      
      console.log("Grades Shown" + rollNo + " " + grade);

      // var show = `<tr><th>${rollNo}</th><td>${grade}</td></tr>`
      var show = `${rollNo}   ${grade}`

      showGrade.append(show);
      // $("#content").hide();
      // $("#loader").show();
    }).catch(function (err) {
      console.error(err);
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
