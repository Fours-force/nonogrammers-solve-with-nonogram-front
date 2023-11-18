<template>
    <div id="wapper" class="mx-auto max-w-screen-xl h-auto min-h-full mb-5">
        <div class="w-full mb-4 test flex md:flex-col lg:flex-row h-6/6">
            <div class="font-super256 min-w-max movebtn eightbit-btn" @click="goback">BACK</div>
            <div class="h-6/6">
                <div class="w-full mt-4 bg-gray-50 rounded-full dark:bg-gray-700">
                    <div id="progressBar"
                         class="font-super256 text-white text-2xl font-medium bg-blue-600 text-center p-0.5 leading-none rounded-full memberCountCon"
                         style="width: 1%;">
                        <div id="barPosition" class="block w-3 h-3">
                        </div>
                    </div>
                </div>
                <br>
                <div id="nonoBoxBolder" class="mb-4 h-6/6">
                    <div id="NonoboxContainer">     
                        <div class="rowContainer" v-for = "(row, rowIndex) in totalRowList" :key="`row-${rowIndex}`"
                        @click="goToProblem(rowIndex)"
                        @mouseover="rowMouseUp(rowIndex)"
                        @mouseout="rowMouseOut(rowIndex)"
                             :class="row.onRow"
                        >
                            <p class="nonoDot" v-for="(eachDot, dotIndex) in row" 
                            :key="`dot-${dotIndex}`" 
                            :style="{ background: '#' + eachDot.color}"
                            :class="eachDot.isSolved"></p>
                        </div>                    
                    </div>
                </div>
                <br>
                <div id="ListbtnContainer" class="flex">
                    <div class="font-super256 min-w-max movebtn eightbit-btn" @click="check">CHECK
                    </div>
                    <div class="font-super256 min-w-max movebtn eightbit-btn" @click=goToList>LIST
                    </div>
                </div>
                <br>
            </div>
            <div class="font-super256 min-w-max movebtn eightbit-btn" @click=gonext>NEXT</div>
        </div><br>
    </div>
</template>

<script setup>

import {onMounted, watch, ref, onBeforeMount, computed} from 'vue';
    import {setNonoData, data} from '@/assets/js/nono/nonodots';
    import {api} from "@/assets/js/common";

    let {progress, nonoId, urlAry, totalRowList, nonoClass} = setNonoData();

    const getNono = () => {
      console.log("getNonodots start !!!");
      api(`http://localhost:8089/nonodots/${data.userId}/${data.nonoId}/${data.baekjoonId}`,'Get','').then((result) => {
        console.log(progress);
        progress.value = ref(result.progress);
        nonoId.value = ref(result.nonoId);
        urlAry.value = ref(result.urlAry);
        totalRowList.value = ref(result.totalRowList);
        console.log(progress);
        console.log(totalRowList);
        setStyle();
        loadSolvedDot();
      }).catch((e) => {
        console.log(e);
      });
      console.log("getNonodots end !!!");
    }


    const rowOnCheck = ref([]);
    const solvingRow = ref('0');
    const newTotalRowList = ref([]);
    let newSingleRowList = [];
    let newSingleRowList2 = [];
    const rowMouseUp = (index) =>{
      console.log("mouseup");
      totalRowList.value[index].onRow = 'currentRowColor';
      console.log(rowOnCheck[index]);
    }

    const rowMouseOut = (index) => {
      console.log("mouseout");
      totalRowList.value[index].onRow = 'defaultRowColor';
    }

    onMounted(() => {
        console.log('onMounted!');
        getNono();
        getSolvingRow();
        console.log("끝");        
    })
    // watch(progress, (newValue, oldValue) => {
    //   console.log(`Count changed from ${oldValue} to ${newValue}`);
    //   if (newValue === 100) {
    //     console.log('다 푼 문제로~');
    //   }
    // });
    
    const loadSolvedDot = () =>{
        console.log("loadSolvedDot start!");
        api(`http://localhost:8089/api/selectSolvedDotId/${data.userId}/${data.nonoId}`,'Get','').then((result) => {
          console.log(result);
          let col = 0;
          let row = 0;
          for(let i=0; i <result.length; i++){
            col = Math.floor((result[i]-1)/32); //소수점 제거
            row = (result[i]-1)%32;
            totalRowList.value[col][row].isSolved ='solved';
            totalRowList.value[col][row].onRow ='defaultRowColor';
          }

        }).catch((e) => {
          console.log(e);
        });

    }
    const setStyle = () =>{
      console.log("setstyle start!")
      for(let i=0; i <totalRowList.value.length; i++){
        for(let j=0; j<32; j++){
          totalRowList.value[i][j].isSolved = ref('notsolved');

        }
        rowOnCheck[i] = {'onRow':'defaultRowColor'};
      }
    }



    // const goback = () => {
    //   console.log("goback");
    // };

    // const gonext = () => {
    //     console.log("gonext");
    // };

    // const check = () => {
    //     console.log("check");
    // };

    const goToList = () => {
        console.log("goToList");
        location.href='/nonobox';
    };

    const updateSolvingRow = (num) => {
      console.log("updateSolvingRow");
      solvingRow.value = num+1;
      api(`http://localhost:8089/api/updateSolvingRow/${data.userId}/${data.nonoId}/${solvingRow.value}`,'GET','').then((result) =>{
        console.log("앙 기모띠");
      });
    }

    const getSolvingRow = () =>{
      console.log("getSolvingRow");
      api(`http://localhost:8089/api/selectSolvingRow/${data.userId}/${data.nonoId}`,'GET','').then((result) =>{
        console.log(result);
        solvingRow.value = result;
        console.log("앙 기모띠");
      });
    }


    const goToProblem = (num) => {
        console.log("goToProblem");
        console.log(num);
        updateSolvingRow(num);
        location.href = `https://www.acmicpc.net/problem/${urlAry.value[Number.parseInt(num)]}`;
    }



    console.log("end script");
</script>
<style scoped>
  .notsolved{
    opacity: 0.2;
  }
  .solved{
    opacity: 1;
  }
  .defaultRowColor{
    border-bottom: none;
  }
  .currentRowColor{
    border-bottom: 10px solid #264E86;
  }
</style>

