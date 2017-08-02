var xl = require('excel4node');
var config=require('../config.json');
const sql = require('mssql');
var XLSX = require('xlsx');
const gpool = new sql.ConnectionPool(config)
gpool.connect(err => {
   console.log(err);
})

function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  
  return [pad(d.getMonth()+1),pad(d.getDate()), d.getFullYear()].join('/');
}
module.exports.controller = function(app) {
    app.get('/', function(req, res, next) {
        console.log("A user has connected");
        sql.close();
        const request = new sql.Request(gpool)

        request.execute('get_all_procurement', (err, result) => {
            // ... error checks 
            request.query('SELECT TOP 1 * FROM procurement_tbl4 ORDER BY id DESC  ',(err, result1) => {
                last = result1.recordset[0].id;
                 res.render('index',{title:"Procurement Monitoring",data:result.recordset});

            })
           

        }) 

    });



    app.get('/Excel', function(req, res){
        var wb = new xl.Workbook();
        var ws = wb.addWorksheet('Sheet 1');
        var myStyle = wb.createStyle({
            font: {
                bold: true,
                underline: true
            }, 
            alignment: {
                wrapText: true,
                horizontal: 'center'
            }
        });  
        ws.cell(2, 2).Decimal(5);
        ws.cell(3, 2).Decimal(10);
        ws.cell(4, 2).Decimal(22);
        ws.cell(5, 2).formula('=SUM(B2:B4)');

        wb.write('ExcelFile.xlsx',res); 

    });
     app.get('/centext23ict', function(req, res){
         filepath='test.xlsx'
         res.set({
                    "Content-Disposition": 'attachment; filename="Procurement Monitoring Report 1st Sem 2017 as of 25 June 2017(July,7 2017).xlsx"',
                    "Content-Type": "text/plain"
                });
         res.sendFile(__dirname + '/' + filepath);
        
    });
    app.get('/readexcel',function(req,res){
        if(typeof require !== 'undefined') XLSX = require('xlsx');
        var workbook = XLSX.readFile('Procurement Monitoring Report 1st Sem 2017 as of 25 June 2017(July,7 2017).xlsx');
        var sheet_name_list = workbook.SheetNames;
        var worksheet = workbook.Sheets['Jan-June 2017 '];
        
        var headers = {};
        var data = [];
        //25 - 575

        for(i=25; i<=575 ; i++){
            entry = {};
            entry.code_PAP = (worksheet['A'+i] ? worksheet['A'+i].w: '')
            entry.pr_no = (worksheet['B'+i] ? worksheet['B'+i].w: '') 
            entry.PO_JO  = (worksheet['C'+i] ? worksheet['C'+i].w: '') 
            entry.program_proj_name  = (worksheet['D'+i] ? worksheet['D'+i].w: '') 
            entry.end_user  = (worksheet['E'+i] ? worksheet['E'+i].w: '') 
            entry.MOP  = (worksheet['F'+i] ? worksheet['F'+i].w: '') 
            entry.pre_Proc  = (worksheet['G'+i] ? convertDate(worksheet['G'+i].w): undefined)
            entry.ads_post_IAEB  = (worksheet['H'+i] ? convertDate(worksheet['H'+i].w): undefined)
            entry.Pre_bid = (worksheet['I'+i] ? convertDate(worksheet['I'+i].w) : undefined) 
            entry.Eligibility_Check  = (worksheet['J'+i] ?  convertDate(worksheet['J'+i].w): undefined) 
            entry.oob  = (worksheet['K'+i] ? convertDate(worksheet['K'+i].w) : undefined) 
            entry.Bid_Eval  = (worksheet['L'+i] ? convertDate(worksheet['L'+i].w) : undefined)
            entry.Post_Qual  = (worksheet['M'+i] ? convertDate(worksheet['M'+i].w): '') 
            entry.Notice_of_Award  = (worksheet['N'+i] ? convertDate(worksheet['N'+i].w) : undefined)
            entry.Contract_Signing  = (worksheet['O'+i] ? convertDate(worksheet['O'+i].w) : undefined) 
            entry.Notice_To_Proceed  = (worksheet['P'+i] ? convertDate(worksheet['P'+i].w) : undefined) 
            entry.Del_Completion = (worksheet['Q'+i] ? convertDate(worksheet['Q'+i].w) : undefined) 
            entry.Acceptance_date  = (worksheet['R'+i] ? convertDate(worksheet['R'+i].w) : undefined) 
            entry.Source_of_Funds  = (worksheet['S'+i] ? worksheet['S'+i].w: '') 
            entry.ABC  = (worksheet['T'+i] ? worksheet['T'+i].w.replace(',', '') : '') 
            entry.ABC_MOOE  = (worksheet['U'+i] ? worksheet['U'+i].w.replace(',', '') : '') 
            entry.ABC_CO  = (worksheet['V'+i] ? worksheet['V'+i].w.replace(',', '') : '') 
            entry.ABC_Others  = (worksheet['W'+i] ? worksheet['W'+i].w.replace(',', '') : '') 
            entry.Contract_Cost  = (worksheet['X'+i] ? worksheet['X'+i].w.replace(',', '') : '') 
            entry.Contract_Cost_MOOE = (worksheet['Y'+i] ? worksheet['Y'+i].w.replace(',', '') : '') 
            entry.Contract_Cost_CO = (worksheet['Z'+i] ? worksheet['Z'+i].w.replace(',', '') : '') 
            entry.Contract_Cost_Others  = (worksheet['AA'+i] ? worksheet['AA'+i].w.replace(',', '') : '') 
            entry.Invited_Observers  = (worksheet['AB'+i] ? worksheet['AB'+i].w: '') 
            entry.DRP_Pre_Proc_conf  = (worksheet['AC'+i] ?  convertDate(worksheet['AC'+i].w): '') 
            entry.DRP_Pre_Bid_conf  = (worksheet['AD'+i] ? convertDate(worksheet['AD'+i].w) : undefined) 
            entry.DRP_Eligibility_check  = (worksheet['AE'+i] ?  convertDate(worksheet['AE'+i].w): undefined) 
            entry.DRP_OOP = (worksheet['AF'+i] ? convertDate(worksheet['AF'+i].w) : undefined) 
            entry.DRP_Bid_Eval = (worksheet['AG'+i] ? convertDate(worksheet['AG'+i].w) : undefined) 
            entry.DRP_Post_Qual = (worksheet['AH'+i] ? convertDate(worksheet['AH'+i].w) : undefined) 
            entry.DRP_Notice_of_Award  = (worksheet['AI'+i] ? convertDate(worksheet['AI'+i].w) : undefined)
            entry.DRP_Contract_Signing  = (worksheet['AJ'+i] ? convertDate(worksheet['AJ'+i].w) : undefined) 
            entry.DRP_Delivery_Accept = (worksheet['AK'+i] ? convertDate(worksheet['AK'+i].w) : undefined) 
            entry.Remarks  = (worksheet['AL'+i] ? worksheet['AL'+i].w: '') 
            data.push(entry);
            sql.close();
			const request = new sql.Request(gpool)
			.input('code_PAP', sql.NVarChar, entry.code_PAP)
			.input('pr_no', sql.NVarChar, entry.pr_no)
            .input('PO_JO', sql.NVarChar, entry.PO_JO)
            .input('program_proj_name', sql.NVarChar, entry.program_proj_name)
            .input('end_user', sql.NVarChar, entry.end_user)
            .input('MOP', sql.NVarChar, entry.MOP)
            .input('pre_Proc', sql.NVarChar, entry.pre_Proc)
            .input('ads_post_IAEB', sql.NVarChar, entry.ads_post_IAEB)
            .input('Pre_bid', sql.NVarChar, entry.Pre_bid)
            .input('Eligibility_Check', sql.NVarChar, entry.Eligibility_Check)
            .input('oob', sql.NVarChar, entry.oob)
            .input('Bid_Eval', sql.NVarChar, entry.Bid_Eval)
            .input('Post_Qual', sql.NVarChar, entry.Post_Qual)
            .input('Notice_of_Award', sql.NVarChar, entry.Notice_of_Award)
            .input('Contract_Signing', sql.NVarChar, entry.Contract_Signing)
            .input('Notice_To_Proceed', sql.NVarChar, entry.Notice_To_Proceed)
            .input('Del_Completion', sql.NVarChar, entry.Del_Completion)
            .input('Acceptance_date', sql.NVarChar, entry.Acceptance_date)
            .input('Source_of_Funds', sql.NVarChar, entry.Source_of_Funds)
            .input('ABC', sql.Float,parseFloat(entry.ABC))
            .input('ABC_MOOE', sql.Decimal, parseFloat(entry.ABC_MOOE))
            .input('ABC_CO', sql.Decimal, parseFloat(entry.ABC_CO))
            .input('ABC_Others', sql.Decimal, parseFloat(entry.ABC_Others))
            .input('Contract_Cost', sql.Decimal, parseFloat(entry.Contract_Cost))
            .input('Contract_Cost_MOOE', sql.Decimal, parseFloat(entry.Contract_Cost_MOOE))
            .input('Contract_Cost_CO', sql.Decimal, parseFloat(entry.Contract_Cost_CO))
            .input('Contract_Cost_Others', sql.Decimal, parseFloat(entry.Contract_Cost_Others))
            .input('Invited_Observers', sql.NVarChar, entry.Invited_Observers)
            .input('DRP_Pre_Proc_conf', sql.NVarChar, entry.DRP_Pre_Proc_conf)
            .input('DRP_Pre_Bid_conf', sql.NVarChar, entry.DRP_Pre_Bid_conf)
            .input('DRP_Eligibility_check', sql.NVarChar, entry.DRP_Eligibility_check)
            .input('DRP_OOP', sql.NVarChar, entry.DRP_OOP)
            .input('DRP_Bid_Eval', sql.NVarChar, entry.DRP_Bid_Eval)
            .input('DRP_Post_Qual', sql.NVarChar, entry.DRP_Post_Qual)
            .input('DRP_Notice_of_Award', sql.NVarChar, entry.DRP_Notice_of_Award)
            .input('DRP_Contract_Signing', sql.NVarChar, entry.DRP_Contract_Signing)
            .input('DRP_Delivery_Accept', sql.NVarChar, entry.DRP_Delivery_Accept)
            .input('Remarks', sql.NVarChar, entry.Remarks)
            .execute('insert_procurement', (err, result) => {
			// ... 
            //console.log(err)
          
			})
            
        }
        console.log(data[455]);
        //drop those first two rows which are empty
        res.send('<h5>HI</h5>');

    })
}



 
  