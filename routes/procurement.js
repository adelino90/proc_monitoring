var xl = require('excel4node');
var config=require('../config.json');
const sql = require('mssql');
var XLSX = require('xlsx');
const gpool = new sql.ConnectionPool(config)
gpool.connect(err => {
   console.log(err);
})

function convertDate(inputFormat) {
  if(inputFormat)
    p = inputFormat.split("/", 3);
  if(!inputFormat || inputFormat=="")
    return undefined
  else
   return [p[1],p[0],p[2]].join('/');
}
module.exports.controller = function(app) {

       app.get('/fixed', function(req, res, next) {
            res.render('fixedheader',{title:"Add Procurement Monitoring"});
      });


     app.get('/view_procurement/:id',function(req,res,next){
      sql.close();

		      	 const request = new sql.Request(gpool)
			      .input('id', sql.Int, req.params.id)
            .execute('get_procurement_by_id', (err, result) => {
			        // ... 
        
              res.render('add',{title:"Add Procurement Monitoring",data : result.recordset[0],mode : 2});
          
			  })
     })
     app.get('/add', function(req, res, next) {
            res.render('add',{title:"Add Procurement Monitoring",mode:1});

     });
    
     function nullvalidation(input){
      if(input==null)
        return '';
      else
        return input;
     }
    app.post('/search', function(req, res, next) {
            var search_str = req.body.search;
              sql.close();
             const request = new sql.Request(gpool)
             .input('search_str', sql.NVarChar, search_str)
             .execute('procurement_search', (err, result) => {
			        // ... 
             record_len = result.recordset.length;
             html="";
             data = result.recordset;
              for(i=0;i<record_len;i++){
                  html=html+' <tr class = "row-hover procurement_data" data-id = '+ nullvalidation(data[i].id) +'  data-toggle="modal" data-target="#myModal">\
                                    <td class = "cells small_width">'+ nullvalidation(data[i].code_PAP) +'</td>\
                                    <td class = "cells small_width">'+ nullvalidation(data[i].pr_no) +'</td>\
                                    <td class = "cells small_width">'+ nullvalidation(data[i].PO_JO) +'</td>\
                                    <td class = "cells program_name no-pads">'+ nullvalidation(data[i].program_proj_name)+'</td>  \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].end_user)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].MOP)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].pre_Proc) +'</td>  \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].ads_post_IAEB)+'</td>  \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Pre_bid) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Eligibility_Check)+'</td>  \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].oob) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Bid_Eval)+'</td>  \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Post_Qual)+'</td>  \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Notice_of_Award) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Contract_Signing)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Notice_To_Proceed)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Del_Completion)+'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Acceptance_date) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Source_of_Funds)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].ABC)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].ABC_MOOE) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].ABC_CO)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].ABC_Others) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Contract_Cost) +'</td> \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Contract_Cost_MOOE) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Contract_Cost_CO) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Contract_Cost_Others)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Invited_Observers) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Pre_Proc_conf)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Pre_Bid_conf) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Eligibility_check)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_OOP) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Bid_Eval) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Post_Qual) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Notice_of_Award)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Contract_Signing) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Delivery_Accept) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Remarks)  +'</td>\
                                </tr>';
                            
              }
                              if(html=="")
                                html=' <tr class = "row-hover procurement_data" data-toggle="modal" data-target="#myModal"><td class = "cells data_cell" colspan="37"><b>No Results Found</b></td><tr>'

                              res.send(html);
          
			  })
     });



     app.post('/save',function(req,res,next){
            sql.close();
		      	 const request = new sql.Request(gpool)
			      .input('code_PAP', sql.NVarChar, req.body.code_PAP)
			      .input('pr_no', sql.NVarChar, req.body.pr_no)
            .input('PO_JO', sql.NVarChar, req.body.PO_JO)
            .input('program_proj_name', sql.NVarChar, req.body.program_proj_name)
            .input('end_user', sql.NVarChar, req.body.end_user)
            .input('MOP', sql.NVarChar, req.body.MOP)
            .input('pre_Proc', sql.NVarChar,  convertDate(req.body.pre_Proc))
            .input('ads_post_IAEB', sql.NVarChar,  convertDate(req.body.ads_post_IAEB))
            .input('Pre_bid', sql.NVarChar,  convertDate(req.body.Pre_bid))
            .input('Eligibility_Check', sql.NVarChar,  convertDate(req.body.Eligibility_Check))
            .input('oob', sql.NVarChar,  convertDate(req.body.oob))
            .input('Bid_Eval', sql.NVarChar,  convertDate(req.body.Bid_Eval))
            .input('Post_Qual', sql.NVarChar,  convertDate(req.body.Post_Qual))
            .input('Notice_of_Award', sql.NVarChar,  convertDate(req.body.Notice_of_Award))
            .input('Contract_Signing', sql.NVarChar,  convertDate(req.body.Contract_Signing))
            .input('Notice_To_Proceed', sql.NVarChar,  convertDate(req.body.Notice_To_Proceed))
            .input('Del_Completion', sql.NVarChar,  convertDate(req.body.Del_Completion))
            .input('Acceptance_date', sql.NVarChar,  convertDate(req.body.Acceptance_date))
            .input('Source_of_Funds', sql.NVarChar, req.body.Source_of_Funds)
            .input('ABC', sql.Float,parseFloat(req.body.ABC))
            .input('ABC_MOOE', sql.Float, parseFloat(req.body.ABC_MOOE))
            .input('ABC_CO', sql.Float, parseFloat(req.body.ABC_CO))
            .input('ABC_Others', sql.Float, parseFloat(req.body.ABC_Others))
            .input('Contract_Cost', sql.Float, parseFloat(req.body.Contract_Cost))
            .input('Contract_Cost_MOOE', sql.Float, parseFloat(req.body.Contract_Cost_MOOE))
            .input('Contract_Cost_CO', sql.Float, parseFloat(req.body.Contract_Cost_CO))
            .input('Contract_Cost_Others', sql.Float, parseFloat(req.body.Contract_Cost_Others))
            .input('Invited_Observers', sql.NVarChar, req.body.Invited_Observers)
            .input('DRP_Pre_Proc_conf', sql.NVarChar,  convertDate(req.body.DRP_Pre_Proc_conf))
            .input('DRP_Pre_Bid_conf', sql.NVarChar,  convertDate(req.body.DRP_Pre_Bid_conf))
            .input('DRP_Eligibility_check', sql.NVarChar,  convertDate(req.body.DRP_Eligibility_check))
            .input('DRP_OOP', sql.NVarChar,  convertDate(req.body.DRP_OOP))
            .input('DRP_Bid_Eval', sql.NVarChar,  convertDate(req.body.DRP_Bid_Eval))
            .input('DRP_Post_Qual', sql.NVarChar,  convertDate(req.body.DRP_Post_Qual))
            .input('DRP_Notice_of_Award', sql.NVarChar,  convertDate(req.body.DRP_Notice_of_Award))
            .input('DRP_Contract_Signing', sql.NVarChar,  convertDate(req.body.DRP_Contract_Signing))
            .input('DRP_Delivery_Accept', sql.NVarChar,  convertDate(req.body.DRP_Delivery_Accept))
            .input('Remarks', sql.NVarChar, req.body.Remarks)
            .execute('insert_procurement', (err, result) => {
			        // ... 
              if(!err)
                res.send("OK!")
               else
               console.log(err); 
          
			  })
     })
     

      app.post('/save_update',function(req,res,next){
          sql.close();
		      	 const request = new sql.Request(gpool)
             .input('id', sql.Int, req.body.id)
			      .input('code_PAP', sql.NVarChar, req.body.code_PAP)
			      .input('pr_no', sql.NVarChar, req.body.pr_no)
            .input('PO_JO', sql.NVarChar, req.body.PO_JO)
            .input('program_proj_name', sql.NVarChar, req.body.program_proj_name)
            .input('end_user', sql.NVarChar, req.body.end_user)
            .input('MOP', sql.NVarChar, req.body.MOP)
            .input('pre_Proc', sql.NVarChar,  convertDate(req.body.pre_Proc))
            .input('ads_post_IAEB', sql.NVarChar,  convertDate(req.body.ads_post_IAEB))
            .input('Pre_bid', sql.NVarChar,  convertDate(req.body.Pre_bid))
            .input('Eligibility_Check', sql.NVarChar,  convertDate(req.body.Eligibility_Check))
            .input('oob', sql.NVarChar,  convertDate(req.body.oob))
            .input('Bid_Eval', sql.NVarChar,  convertDate(req.body.Bid_Eval))
            .input('Post_Qual', sql.NVarChar,  convertDate(req.body.Post_Qual))
            .input('Notice_of_Award', sql.NVarChar,  convertDate(req.body.Notice_of_Award))
            .input('Contract_Signing', sql.NVarChar,  convertDate(req.body.Contract_Signing))
            .input('Notice_To_Proceed', sql.NVarChar,  convertDate(req.body.Notice_To_Proceed))
            .input('Del_Completion', sql.NVarChar,  convertDate(req.body.Del_Completion))
            .input('Acceptance_date', sql.NVarChar,  convertDate(req.body.Acceptance_date))
            .input('Source_of_Funds', sql.NVarChar, req.body.Source_of_Funds)
            .input('ABC', sql.Float,parseFloat(req.body.ABC))
            .input('ABC_MOOE', sql.Float, parseFloat(req.body.ABC_MOOE))
            .input('ABC_CO', sql.Float, parseFloat(req.body.ABC_CO))
            .input('ABC_Others', sql.Float, parseFloat(req.body.ABC_Others))
            .input('Contract_Cost', sql.Float, parseFloat(req.body.Contract_Cost))
            .input('Contract_Cost_MOOE', sql.Float, parseFloat(req.body.Contract_Cost_MOOE))
            .input('Contract_Cost_CO', sql.Float, parseFloat(req.body.Contract_Cost_CO))
            .input('Contract_Cost_Others', sql.Float, parseFloat(req.body.Contract_Cost_Others))
            .input('Invited_Observers', sql.NVarChar, req.body.Invited_Observers)
            .input('DRP_Pre_Proc_conf', sql.NVarChar,  convertDate(req.body.DRP_Pre_Proc_conf))
            .input('DRP_Pre_Bid_conf', sql.NVarChar,  convertDate(req.body.DRP_Pre_Bid_conf))
            .input('DRP_Eligibility_check', sql.NVarChar,  convertDate(req.body.DRP_Eligibility_check))
            .input('DRP_OOP', sql.NVarChar,  convertDate(req.body.DRP_OOP))
            .input('DRP_Bid_Eval', sql.NVarChar,  convertDate(req.body.DRP_Bid_Eval))
            .input('DRP_Post_Qual', sql.NVarChar,  convertDate(req.body.DRP_Post_Qual))
            .input('DRP_Notice_of_Award', sql.NVarChar,  convertDate(req.body.DRP_Notice_of_Award))
            .input('DRP_Contract_Signing', sql.NVarChar,  convertDate(req.body.DRP_Contract_Signing))
            .input('DRP_Delivery_Accept', sql.NVarChar,  convertDate(req.body.DRP_Delivery_Accept))
            .input('Remarks', sql.NVarChar, req.body.Remarks)
            .execute('save_update_procurement', (err, result) => {
			        // ... 
              if(!err)
                res.send("OK!")
               else
               console.log(err); 
          
			  })
     })

   
}



 
  