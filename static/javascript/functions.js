"use strict"
class Expense {
	constructor(date, store, category, item, amount, id) {
		this.date = date
		this.store = store
		this.category = category
		this.item = item
		this.amount = amount
		this.id = id;
	}

}
class ExpenseDB {
	constructor() {
		this.allExpenses = [];
	}
	newExpense(yeah) {

		this.allExpenses.push(yeah);

	}
	saveMe(e) {
		let dfd = new $.Deferred();
		var self = this;
		$.ajax({
			url: "http://localhost:8088/api/v1/expenses",
			method: 'POST',
			contentType: "application/json",
			data: JSON.stringify(e),
			dataType: "json"
		}).done(function(data){
			e.id = data._id["$oid"]
			dfd.resolve();
		}).fail(function() {alert("help!!!")})
		return dfd;
	}
	
	restoreMe() {
		let self = this;
		let dfd = new $.Deferred();
		$.ajax({
			url: "http://localhost:8088/api/v1/expenses"
		}).done(function(data) {
		  for(let e of data) {
			e = new Expense(e.date, e.store, e.category, e.item, e.amount, e._id["$oid"]);
			self.allExpenses.push(e);
		}
		dfd.resolve();
		});
		return dfd;
		}


		//var saved = JSON.parse(localStorage.expenseData)
		//for (let i = 0; i < saved.length; i++) {
		//	this.allExpenses.push(saved[i]);
		//};

    deleteMe(id) {
			let done = false;
			let i;
			for(i = 0; i < this.allExpenses.length && ! done; i++) {
				if(this.allExpenses[i].id == id) {
					done = true;
				}
			}
			if (done) {
				this.allExpenses.splice(i-1,1);
				$.ajax({
					url: "http://localhost:8088/api/v1/expenses/" + id,
					method: "DELETE"
				})
			}
    }
}
