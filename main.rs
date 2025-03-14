mod cat;
mod copy_example;
mod dereference_example;
mod move_example;
mod reference_example;
mod slice_example;
mod stack;
fn main() {
    copy_example::fn_arg_copied();
    move_example::mut_reuse_not_moved();
    move_example::immu_moved_to_fn_arg();
    reference_example::ref_assign_basic();
    reference_example::caller_mut_immut_reference();
    reference_example::caller_reference_scope();
    reference_example::caller_mut_immut_reference2();
    reference_example::caller_reference_scope2();
    dereference_example::dereference_str();
    dereference_example::dereference_number();
    dereference_example::dereference_pointer();
    dereference_example::assign_direct_ref_val();
    dereference_example::assign_double_ref_val();
    slice_example::str_slice_example();
    cat::kitten::meow();
    stack::all();
}
