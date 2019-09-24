function Student(name, age){

	this.name = name;
	this.age = age;
	this.marks = [];
};

function Group () {
	this.push.apply (this, arguments);
}

Group.prototype = Object.create(Array.prototype);

Group.prototype.addStudent = function(student){
	this.push(student);
};

Group.prototype.deleteStudent = function (name) {
	var index = this.findIndex(function(item){
		return item.name === name;
	});
	if(index != -1){
		this.splice(index, 1);
	} 
};

Student.prototype.addMark = function (lessonNumber, mark) {
	this.marks[lessonNumber - 1] = mark;
};

Student.prototype.averageMark = function () {
    var sum = this.marks.reduce ( function (sum, mark) {
        return sum += mark;
	}, 0);	
	return sum / this.marks.length;
};

Group.prototype.averageGroupMark = function (lessonNumber) {
	var sumMarks = this.reduce (function (sum, current){
		return sum + (current.marks[lessonNumber-1] || 0);
	},0);
	return sumMarks / this.length;
};

Group.prototype.getSortByName = function() {	
	return this.sort (function(student1, student2){	
	return (student1.name > student2.name) ?  1 : -1;
	});
};

Group.prototype.getSortByAverageMark = function () {		
	return this.sort(function(student1, student2){	
		var student1AverageMark = student1.averageMark();
		var student2AverageMark = student2.averageMark();
		return (student1AverageMark < student2AverageMark) ? 1 : -1;
	});
};


///////////////
//создаем студ.
var ed = new Student ('Ed', 22);
var nik = new Student ('Nik', 20);
var kate = new Student ('Kate', 21);
//создаем группу
var group = new Group (ed, nik, kate);
//добавляем студ.
var ann = new Student ('Ann', 21);
var bob = new Student ('Bob', 22);
group.addStudent (ann);
group.addStudent (bob);
//удаляем студ.
group.deleteStudent ('Nik');
group.deleteStudent ('Bob');
//добавляем оценки за занятия
ed.addMark(1, 6);
ed.addMark(2, 6);
ed.addMark(3, 7);

kate.addMark(1, 9);
kate.addMark(2, 8);
kate.addMark(3, 10);

ann.addMark(1, 8);
ann.addMark(2, 4);
//средняя оценка студ.
console.log (ed.averageMark());
console.log (kate.averageMark());
console.log (ann.averageMark());
//средняя оценка группы за урок
console.log (group.averageGroupMark(1));
console.log (group.averageGroupMark(2));
console.log (group.averageGroupMark(3));
//получаем массив студ. отсортированый по именам
var sortName = group.getSortByName().slice();
console.log (sortName);
//получаем массив студ. отсортированый по среднему балу
var SortAvgMark = group.getSortByAverageMark().slice();
console.log (SortAvgMark);