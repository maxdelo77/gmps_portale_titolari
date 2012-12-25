function moveColumn(table_id, dir)
{
  var table = document.getElementById(table_id);
  var id = (dir=="left") ? GetCellLastId(table) : GetCellFirstId(table);
   //alert("Found ID " + id);

  // cell to rem
  var idx = GetCellIndex(id, table);
   //alert('idx ' + idx);
  
  if (null == idx) return;
  
  var numcols=table.rows[0].cells.length;
   //alert('Num visible Cols ' + numcols);
  
  var fIdx;  
  // cell to ins
  fIdx = (dir=="left") ? (idx+1) : (idx-1);
   //alert('fIdx ' + fIdx);

  if (fIdx < 0) fIdx=numcols-1;
  if (fIdx == numcols) fIdx=0;
	
  var table1 = document.getElementById('tableB');
  //alert('table1 ' + table1);	
  var idHid = (dir == 'left') ? GetCellLastId(table1) : GetCellFirstId(table1);
  //alert('idHid ' + idHid);
  // cel to vis
  var index = GetCellIndex(idHid, table1);
  //alert('index ' + index);
	var j=table.rows.length;

	for (k=0; k<j; k++)  {
		var row = table.rows[k];
		 //alert('remove from Visib ' + idx);
		var x = row.removeChild(row.cells[idx]);

		 //alert('remove from Hid ' + index);
		var y = table1.rows[k].removeChild(table1.rows[k].cells[index]);

		if (dir=="left") {
		    //alert('insert VISIB  before ' + fIdx);
		   row.insertBefore(y, row.cells[fIdx]);
		} else {
		    //alert('insert VISIB  before1  ' + (fIdx-1) );
		   row.insertBefore(y, row.cells[fIdx-1].nextSibling);
		}

		cellHide(x, k, dir);
		
  	}

}

function GetCellIndex(id, table)
{
	var cells = table.rows[0].cells;
	var i = cells.length;
	while ( i-- ){
		if ( cells[i].id && id == cells[i].id ){
		  return i;
		}
	}
	return null;
}

function GetCellFirstId(table)
{
	var cells = table.rows[0].cells;
	//alert('First ID ' + cells[0].id.value);
	return cells[0].id;	
}

function GetCellLastId(table)
{
	var cells = table.rows[0].cells;
	var i = cells.length;
	return cells[i-1].id;	
}

function cellHide(cell, j, dir)
{
  	var table1 = document.getElementById('tableB');

  	var row = table1.rows[j];
  	// var cells = row.cells;
  	var i = row.cells.length;
  	// alert('insert into row ' + j);
  	
	if (dir == "left") {
	   //alert('hide before first');
	   row.insertBefore(cell, row.cells[0]);
	   //alert('hidden before first');
	} else {
	   //alert('hide after last ' + i);
	   row.insertBefore(cell, row.cells[i-1].nextSibling);
	   // alert('hidden after last');	 
	}	
}
