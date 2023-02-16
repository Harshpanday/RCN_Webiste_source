<template>
<el-button type="warning" round v-on:click="getdata(selected_data,source,target)">Update-Data</el-button>
<el-button type="warning" round v-on:click="searchkey=[]">Reset Filter</el-button>
<el-table :data="filtered" :index="index" style="width: 100%" height="1230" @selection-change="handleSelectionChange">
    <el-table-column fixed type="selection" width="55"/>
    <el-table-column prop="Title" label="Title" width="250">
        <template #header="scope" >

        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
          <el-sub-menu index="1">
            
            <template #title>Title</template>
            <el-menu-item index="Source" @click="handleSource(scope.$index)">Source</el-menu-item>
            <el-menu-item index="Target" @click="handleTarget(scope.$index)">Target</el-menu-item></el-sub-menu></el-menu>
    </template>
    </el-table-column>

    <el-table-column prop="Organizations" label="Organizations" width="250" >
        <template #header="scope" >
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
          <el-sub-menu index="1">
            <template #title>Organizations</template>
            <el-menu-item index="Source" @click="handleSource(scope.$index)">Source</el-menu-item>
            <el-menu-item index="Target" @click="handleTarget(scope.$index)">Target</el-menu-item></el-sub-menu></el-menu>
    </template>

    </el-table-column>
   
    <el-table-column prop="URL" label="URL" index="index" width="250" >
        <template #header="scope" >
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
          <el-sub-menu index="1">
            <template #title>URL</template>
            <el-menu-item index="Source" @click="handleSource(scope.$index)">Source</el-menu-item>
            <el-menu-item index="Target" @click="handleTarget(scope.$index)">Target</el-menu-item></el-sub-menu></el-menu>    
    </template>  
    <template #default="scope">
    <el-link :href="scope.row.URL"  type="primary">{{scope.row.URL}}</el-link>  
    </template> 
    </el-table-column>
    

     

    <el-table-column prop="Persona #1" label="Persona #1" index="index" width="250" >
        <template #header="scope" >
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
          <el-sub-menu index="1">
            <template #title>Persona #1</template>
            <el-menu-item index="Source" @click="handleSource(scope.$index)">Source</el-menu-item>
            <el-menu-item index="Target" @click="handleTarget(scope.$index)">Target</el-menu-item></el-sub-menu></el-menu>    
    </template>  
    </el-table-column>

    <el-table-column prop="Persona #2" label="Persona #2" index="index" width="250" >
        <template #header="scope" >
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
          <el-sub-menu index="1">
            <template #title>Persona #2</template>
            <el-menu-item index="Source" @click="handleSource(scope.$index)">Source</el-menu-item>
            <el-menu-item index="Target" @click="handleTarget(scope.$index)">Target</el-menu-item></el-sub-menu></el-menu>    
    </template>  
    </el-table-column>

    <el-table-column prop="Persona #3" label="Persona #3" index="index" width="250" >
        <template #header="scope" >
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
          <el-sub-menu index="1">
            <template #title>Persona #3</template>
            <el-menu-item index="Source" @click="handleSource(scope.$index)">Source</el-menu-item>
            <el-menu-item index="Target" @click="handleTarget(scope.$index)">Target</el-menu-item></el-sub-menu></el-menu>    
    </template>  
    </el-table-column>

    <el-table-column prop="Persona #4" label="Persona #4" index="index" width="250" >
        <template #header="scope" >
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
          <el-sub-menu index="1">
            <template #title>Persona #4</template>
            <el-menu-item index="Source" @click="handleSource(scope.$index)">Source</el-menu-item>
            <el-menu-item index="Target" @click="handleTarget(scope.$index)">Target</el-menu-item></el-sub-menu></el-menu>    
    </template>  
    </el-table-column>
    
    <el-table-column prop="Persona #5" label="Persona #5" index="index" width="250" >
        <template #header="scope" >
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
          <el-sub-menu index="1">
            <template #title>Persona #5</template>
            <el-menu-item index="Source" @click="handleSource(scope.$index)">Source</el-menu-item>
            <el-menu-item index="Target" @click="handleTarget(scope.$index)">Target</el-menu-item></el-sub-menu></el-menu>    
    </template>  
    </el-table-column>

    <el-table-column prop="Persona #6" label="Persona #6" index="index" width="250" >
        <template #header="scope" >
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect">
          <el-sub-menu index="1">
            <template #title>Persona #6</template>
            <el-menu-item index="Source" @click="handleSource(scope.$index)">Source</el-menu-item>
            <el-menu-item index="Target" @click="handleTarget(scope.$index)">Target</el-menu-item></el-sub-menu></el-menu>    
    </template>  
    </el-table-column>

    <el-table-column prop="Keyword" label="Keyword" width="250">
      <template #header v-if="searchkey.length > 0">Keyword {{searchkey}}</template>
      <template #default="scope" >
      <el-tag v-for="(k,index) in (scope.row.Keyword.split(','))" :key="index" v-on:click="searchkey.push(k)">{{k}} </el-tag>
      </template>      
      </el-table-column>
    
    <el-table-column >
    <template #header>
        <el-input v-model="searchQuery" size="small" placeholder="Type to search" width="250"/>
      </template>
    </el-table-column>
  </el-table>
<div>
</div>

</template>

<script>
export default{
    name:'TableComp',
    props:['dataset','persona','getdata'],
    data(){
        return {
        selected_data:{},
        searchQuery:'',
        searchkey:[],
        columns:['Title','Organizations','URL','Persona #1','Persona #2','Persona #3','Persona #4','Persona #5','Persona #6','Keyword'],
        target:String,
        source:String,
        keyword_data:[],
        data:this.dataset,
        color:{}
        }
    },
    computed: {
        filtered(){ 
            if(this.searchQuery.length > 1){ 
                return this.data.filter((item)=>{ var columns = item.Title + item.Organizations + item.UNIQUEID + item.URL+item.Keyword.split(','); 
                return this.searchQuery.toLowerCase().split(' ').every(v => columns.toLowerCase().includes(v)); }) }
            else if(this.searchkey.length>=1){
              //return this.data.filter((item)=>{return item.Keyword.split(',').includes(this.searchkey[0])} )
              return this.data.filter((item) => {return this.searchkey.every(v => item.Keyword.split(',').includes(v))})

            }
            
            else{
                return this.data;
      } 
    }
    },
    methods: {
        handleSelectionChange(val){
            this.selected_data=val
        },
        handleSource(index){
          console.log(index)
            this.source = this.columns[index-1]
        },
        handleTarget(index){
            console.log(this.columns)
            this.target = this.columns[index-1]
        }
    }
}
</script>