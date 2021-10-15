<template>
  <v-app>
    <v-main >
    <div class="ma-0 ma-md-4" >
       <v-card  class=" primary text-center pa-4 ma-1 ">
          <h1 class="white--text font-weight-bold">Mis Examenes Pams</h1>
       </v-card> 
       <div class="d-flex justify-center ma-3">
            <v-img
              max-height="210"
              max-width="200"  
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROldqZiqPbSodCsXiAaqJkG1tJqlrNdUqMTA&usqp=CAU"
            ></v-img>
       </div>
      <v-form>
          <v-row class="pa-0 ma-0">
            <v-col cols="11" class="mx-auto">
              <v-row class="justify-center">
                <v-col cols="8" sm="8" md="5">
                  <v-text-field
                  type="number"
                  dense
                    label="DNI"
                    placeholder="DNI"
                    outlined
                    v-model="dni"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" sm="2" md="2" :class="{'disabled':btnBuscar}">
                  <v-btn 
                    :disabled="!(dni.length==8)"
                    :loading="btnLoading"
                    color="primary"
                    @click="getDataExamPatient()"
                    >Buscar</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
      </v-form>
      <v-row justify="center" class="ma-0 pa-0">
      <v-alert v-if="mensajeResultadoTransaccion!==''" dense outlined type="error">
          {{ mensajeResultadoTransaccion }}</v-alert>
        </v-row>
      <v-row class="pa-0 ma-0">
        <v-col cols="11"  class="mx-auto">
          <v-simple-table>
              <template>
                <thead class="primary ">
                  <tr >
                    <th class="white--text font-weight-bold subtitle-1" >ID</th>
                    <th class="white--text font-weight-bold subtitle-1" >Entrega</th>
                    <th class="white--text font-weight-bold subtitle-1" >Examen</th>
                    <th class="white--text font-weight-bold subtitle-1" >Estado</th>
                  </tr>
                </thead>
                <tbody>
                  
                  <tr v-for="(item,index) in data" :key="index" >
                    <td>{{index+1}}</td>
                    <td>{{item.fechaEntregaResultado}}</td>
                    <td>{{item.examen}}</td>
                    <td > 

                       <v-alert v-if="item.estado==null" class="ma-0" dense type="info">
                            Pendiente
                      </v-alert>
                      <v-alert v-else  class="ma-0" dense type="success">
                            Listo
                      </v-alert>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
        </v-col>
      </v-row>
   
     </div>
   </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    btnLoading:false,
    data:[],
    dni:'',
    btnBuscar:true,
    mensajeResultadoTransaccion:''
  }),
  methods:{
    getDataExamPatient(){
      this.data=[];
      var d= this.dni;
      this.dni='';
   
    this.axios.post("/listarMiExamen",{dni:d})
        .then( res=> this.data=res.data)
        .catch(err=>{ console.log(err.response.data)
                 err.response.data.sqlMessage? this.mensajeResultadoTransaccion=err.response.data.sqlMessage : this.mensajeResultadoTransaccion=err;            
                setTimeout(()=>{this.mensajeResultadoTransaccion=''},4000 )
                this.btnGuardarDeshabilitado=false;
        })

    }
  }
};
</script>
<style scope>


</style>