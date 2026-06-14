const Supplier =
require(
 "../models/supplierModel"
);

async function
getPendingSuppliers(
 req,
 res
){

 try{

  const suppliers =
  await Supplier
  .getPendingSuppliers();

  res.json(
   suppliers
  );

 }
 catch(err){

  res.status(500)
  .json({
   message:
   err.message
  });

 }

}

async function
approveSupplier(
 req,
 res
){

 try{

  const supplier =
  await Supplier
  .updateStatus(
    req.params.id,
    "VERIFIED"
  );

  res.json(
   supplier
  );

 }
 catch(err){

  res.status(500)
  .json({
   message:
   err.message
  });

 }

}

async function
rejectSupplier(
 req,
 res
){

 try{

  const supplier =
  await Supplier
  .updateStatus(
    req.params.id,
    "REJECTED"
  );

  res.json(
   supplier
  );

 }
 catch(err){

  res.status(500)
  .json({
   message:
   err.message
  });

 }

}

module.exports = {

 getPendingSuppliers,

 approveSupplier,

 rejectSupplier

};