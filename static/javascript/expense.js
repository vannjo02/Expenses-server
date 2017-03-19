$(document).ready(function() {
	var edb = new expensecontroller()

	let waitfor = edb.expenseDB.restoreMe();
	waitfor.done( function() { edb.realsort(edb.getsortval(), edb.expenseDB.allExpenses) });
	//if (localStorage.expenseData) {
	//	edb.expenseDB.restoreMe();
        //edb.realsort(edb.getsortval(), edb.expenseDB.allExpenses);
	//};


	$('#expense-form').submit(function() {
		var expense = [];
		var inputs = document.getElementsByTagName('input');
		var length = inputs.length;
		for (var i = 0; i < length; i++) {
			var thing = String(inputs[i].value);
			var res = thing.replace("<", "&lt;");
			res = res.replace(">", "&gt;");
			expense.push(res);
		}
		var row = new Expense();
		row.date = expense[0];
		row.store = expense[1];
		row.category = expense[2];
		row.item = expense[3];
		row.amount = expense[4];

		edb.addExpense(row);
		//edb.expenseDB.saveMe(row);

		//edb.expenseDB.newExpense(row);




		return false;
	});


	//$('#save').click(function() {
	//	if (confirm("Save table?")) {
	//		var arr = getTable();
	//		localStorage.setItem("expenseData", JSON.stringify(arr));
	//	}
	//});
	// $('#clear').click(function() {
	// 	if (confirm("Clear table?")) {
	// 		$("#expensetable tbody tr").remove();
	// 	}
	// });
	//$('#restore').click(function() {
	//	if (confirm("Restore table?")) {
	//		$("#expensetable tbody tr").remove();
	//		var saved = JSON.parse(localStorage.expenseData);
	//       realsort(getsortval(), saved);
	//	}
	//});
    // I've removed these functions because it's better to just have the system save and restore automatically.
    // The clear button is replaced by check boxes on each row that will allow multiple delete, or all delete.

    $('#deleterows').click(function() {
        if (confirm("Delete rows?")) {
          var checkedBoxes = document.querySelectorAll('input[id=deletebox]:checked');
          var indexarr = []
          for (let i=0; i<checkedBoxes.length; i++) {
              indexarr.push(checkedBoxes[i].name);
          }
          edb.deleterows(indexarr);
					edb.realsort(edb.getsortval(), edb.expenseDB.allExpenses)
					console.log(edb.expenseDB.allExpenses);
          if(document.getElementById('check-all').checked == true) {
          document.getElementById('check-all').click();
          }
		}
	});

    $("#check-all").checkboxradio().click(function() {
        if(this.checked) {

              $(':checkbox').each(function() {
              this.checked = true;
              });
        }
         else {
            $(':checkbox').each(function() {
              this.checked = false;
              });
         }

	});

	$('#box-link').click(function() {
		var x = Math.floor((Math.random() * 4) + 1);
		var snd = new Audio("media/cat" + x + ".wav");
		snd.play();
	});
	$("body").on("click", "#main tr", function() {
		$("#inputdate").val($(this).find('td').eq(1).text());
		$("#inputstore").val($(this).find('td').eq(2).text());
		$("#inputcategory").val($(this).find('td').eq(3).text());
		$("#inputitem").val($(this).find('td').eq(4).text());
		$("#amount").val(parseFloat($(this).find('td').eq(5).text()));
	});
	$("#reverse-sort").checkboxradio().click(function() {
		//var thing = edb.getTable(); not needed anymore
        var thing = edb.expenseDB.allExpenses;
		$("#expensetable tbody tr").remove();
		if (thing.length !== 0) {
			edb.realsort(edb.getsortval(), thing);
		}
	});
	$("#sort").selectmenu({
		select: function(event, ui) {
			//var thing = edb.getTable(); not needed anymore
            var thing = edb.expenseDB.allExpenses;
			$("#expensetable tbody tr").remove();
			if (thing.length !== 0) {
				edb.realsort(edb.getsortval(), thing);
			}
		}
	});
})
