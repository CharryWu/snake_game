(module
  (import "console" "log" (func $log))
  (import "console" "error" (func $error))
  (func $driver
    call $log
    call $error
  )
  (export "driver" (func $driver))
)
