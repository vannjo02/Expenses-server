class expensecontroller {

    constructor(expenseDB) {
        this.expenseDB = new ExpenseDB;
    }

    toTableRow(newexp, index) {
		var table = document.getElementById("main");
		var row = table.insertRow(0);

		for (let cell of['amount', 'item','category', 'store', 'date']) {
			//let td = document.createElement('td');
            let td = row.insertCell(0);
			td.innerHTML = newexp[cell]
			if (cell == 'amount') {
				td.setAttribute("id", "amountcell");
			}
			//row.appendChild(td)
		}
		// var button = document.createElement('button');
		// var span = document.createElement('span');
		// button.setAttribute('class', 'btn btn-danger btn-xs my-xs-btn btn-block');
		// button.setAttribute('id', 'deletebtn');
		// button.setAttribute('type', 'button');
		// span.setAttribute('class', 'glyphicon glyphicon-remove-circle');
		// button.appendChild(span);
		// row.appendChild(button);
		// document.getElementById("deletebtn").style.marginTop = "6px";
		// document.getElementById("deletebtn").onclick = function Boo() {
		// 	if (confirm("Delete row?")) {
		// 		$(this).closest('tr').remove();
		// 		var arr = document.class.expensecontroller.getTable();
		// 		localStorage.setItem("expenseData", JSON.stringify(arr));
		// 	}
		// };

        var checkbox = document.createElement("INPUT");
        checkbox.type = "checkbox";
        var td = row.insertCell(0);
        //row.appendChild(checkbox);
        td.append(checkbox);
        checkbox.setAttribute('id', 'deletebox');
        checkbox.setAttribute('name', newexp.id);
        td.style.width = "1%";
        //document.getElementById("deletebox").style.width = "0%";



	}


   rebuild(buildarr) {
	for (let i = 0; i < buildarr.length; i++) {
		var row = new Expense();
		row.date = buildarr[i].date;
		row.store = buildarr[i].store;
		row.category = buildarr[i].category;
		row.item = buildarr[i].item;
		row.amount = buildarr[i].amount;
    row.id = buildarr[i].id;
		this.toTableRow(row, i);
	}
    var totalcell = document.getElementById("totalcell");
    var total = 0;
    for (let i=0; i<this.expenseDB.allExpenses.length; i++) {
        total += parseFloat(this.expenseDB.allExpenses[i].amount);
    }
    totalcell.innerHTML = total;

};

 getsortval() {
	var val = $("#sort").val();
	if ($("#reverse-sort").prop('checked')) {
		if (val == null) {
			return "-date";
		} else {
			if (val == "Date" || val == "Amount") {
				return "-" + val.toLowerCase();
			} else {
				return val.toLowerCase();
			}
		}
	} else {
		if (val == null) {
			return "date";
		} else {
			if (val == "Date" || val == "Amount") {
				return val.toLowerCase();
			} else {
				return "-" + val.toLowerCase();
			}
		}
	}
}

 dynamicSort(property) {
	var sortOrder = 1;
	if (property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function(a, b) {
		if (property.substr(1) == "amount" || property.substr(0) == "amount") {
			var a = parseFloat(a[property]),
				b = parseFloat(b[property]);
		} else {
			var a = a[property],
				b = b[property];
		}
		var result = (a < b) ? -1 : (a > b) ? 1 : 0;
		return result * sortOrder;
	}
}

 realsort(sortby, newarr) {
	this.expenseDB.allExpenses = newarr.sort(this.dynamicSort(sortby));
  //this.expenseDB.saveMe();
	$("#expensetable tbody tr").remove();
	this.rebuild(this.expenseDB.allExpenses);
};


addExpense(e) {
  var self = this;
  let waitfor = this.expenseDB.saveMe(e);
  waitfor.done( function() {
  self.expenseDB.newExpense(e);
  self.realsort(self.getsortval(), self.expenseDB.allExpenses);
  })

};


 deleterows(deletearr) {
   for(let i = 0; i<deletearr.length; i++){
     this.expenseDB.deleteMe(deletearr[i]);
   };
 }

//  getTable() {
// 	var arr = [];
// 	$("#expensetable").find('tbody tr').each(function(index, item) {
// 		var date = $(item).find('td').eq(0).text();
// 		var store = $(item).find('td').eq(1).text();
// 		var category = $(item).find('td').eq(2).text();
// 		var item1 = $(item).find('td').eq(3).text();
// 		var amount = $(item).find('td').eq(4).text();
// 		arr.push(new Expense(date, store, category, item1, amount))
// 	});
// 	return arr;
// };
//
// getTable is no longer needed because I'm now just using the ExpenseDB.allExpenses array to get the table elements.
}
