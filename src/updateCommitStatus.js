'use strict';

/**
 * Compare each commit to the last list of commits. Once you find a match, check if the status is different.
 * If the status has changed then change it in the UI.
 * 
 * Called by updateMicroService.js
 */
module.exports = function (ms, prevMs) {
  // console.log('updateCommitStatus - start');
  for (var i = 0; i < ms.commits.length; i++) {
    for (var j = 0; j < prevMs.commits.length; j++) {
      if (ms.commits[i].id === prevMs.commits[j].id) {
        if (ms.commits[i].status !== prevMs.commits[j].status) {
          // console.log('updateCommitStatus - id: ' + ms.commits[i].id);
          // console.log('updateCommitStatus - ms.commits['+ i +'].status = '+ ms.commits[i].status + ' --- prevMs.commits['+ j +'].status = '+ prevMs.commits[j].status);
          var commitDiv = document.getElementById(ms.commits[i].id);
          if (ms.commits[i].currentStage !== 'Production:canary') {
            commitDiv.classList.add(ms.commits[i].status);
          }
          commitDiv.classList.remove(prevMs.commits[j].status);
          // if (ms.commits[i].status === 'success' && (ms.stages.slice(-1)[0].stageID === ms.commits[i].stageID)) {
          //   // Either add a new commit div to the prod stage here OR go add a Prod stage to Stages and Commits
          // }
          // var stageName = ms.commits[i].currentStage.split(':');
          // var prodType = stageName[1];
          if ((ms.commits[i].status === 'in_progress' && prevMs.commits[i].status === 'paused_pending_input') && (ms.commits[i].currentStage === 'Production:canary')) {
            var prod1Div = document.getElementById(ms.name + '-prod-1');
            var prod2Div = document.getElementById(ms.name + '-prod-2');
            var prod3Div = prod2Div.nextElementSibling;
            prod3Div.classList.add('hidden');
            // prod1Div.style = 'animation-duration: 5000ms;';
            // prod2Div.style = 'animation-duration: 5000ms;';
            prod2Div.classList.remove('commit-bottom');
            prod2Div.classList.add('active');
            prod1Div.classList.remove('commit-top');
            // prod1Div.classList.remove('commit-canary');
            // prod1Div.classList.add('hidden');
            prod1Div.firstElementChild.id = ms.name + '-dead';
            prod2Div.firstElementChild.id = ms.name + '-live';
            setTimeout(function(){
              prod1Div.classList.remove('commit-canary');
              prod1Div.classList.add('hidden');
            }, 1000);//commit.duration);
          }
        }
      }
    }
  }
  // console.log('updateCommitStatus - end');
};