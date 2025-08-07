Edits:
```python
# line 200 # class pyvcp_dial:
        '''
        if halparam == None:
            self.param_pin = param_pin
            if self.param_pin == 1:
                halparam = "dial." + str(pyvcp_dial.n) + ".param_pin"
                self.halparam=halparam        
                pycomp.newpin(halparam, HAL_FLOAT, HAL_IN)'''
        self.param_pin = param_pin
        if halparam == None:
            halparam = "dial." + str(pyvcp_dial.n) + ".param_pin"
        self.halparam=halparam        
        pycomp.newpin(halparam, HAL_FLOAT, HAL_IN)

# line 986 # class pyvcp_spinbox:
        '''
        if halparam == None:
            self.param_pin = param_pin
            if self.param_pin == 1:
                halparam = "spinbox." + str(pyvcp_spinbox.n) + ".param_pin"
                self.halparam=halparam
                pycomp.newpin(halparam, HAL_FLOAT, HAL_IN)'''
        self.param_pin = param_pin
        if self.param_pin == 1:
            if halparam == None:
                halparam = "spinbox." + str(pyvcp_spinbox.n) + ".param_pin"
            self.halparam=halparam
            pycomp.newpin(halparam, HAL_FLOAT, HAL_IN)

# line 1573 # class pyvcp_scale:
        '''
        if halparam == None:
            self.param_pin = param_pin
            if self.param_pin == 1:
                halparam = "scale."+str(pyvcp_scale.n)+".param_pin"
                self.halparam=halparam        
                pycomp.newpin(halparam, HAL_FLOAT, HAL_IN)'''
        self.param_pin = param_pin
        if self.param_pin == 1:
            if halparam == None:
                halparam = "scale."+str(pyvcp_scale.n)+".param_pin"
            self.halparam=halparam        
            pycomp.newpin(halparam, HAL_FLOAT, HAL_IN)
```

Test file:
```xml
<pyvcp>
	<dial/>									# dial.0.out	test.dial.0.param_pin
	<dial halpin="dial-a-out"/>						# dial-a-out	test.dial.1.param_pin
	<dial halpin="dial-b-out" param_pin="1"/>				# dial-b-out	dial.2.param_pin
	<dial halpin="dial-c-out" param_pin="1" halparam="dial-c-in"/>		# dial-c-out	dial-c-in
	
	<spinbox/>								# spinbox.0
	<spinbox halpin="spinbox-a-out"/>					# spinbox-a-out
	<spinbox halpin="spinbox-b-out" param_pin="1"/>				# spinbox-b-out	spinbox.2.param_pin
	<spinbox halpin="spinbox-c-out" param_pin="1" halparam="spinbox-c-in"/>	# spinbox-c-out	spinbox-c-in
	
	<scale/>								# scale.0-(f|i)
	<scale halpin="scale-a-out"/>						# scale-a-out-(f|i)
	<scale halpin="scale-b-out" param_pin="1"/>				# scale-b-out-(f|i)	scale.2.param_pin
	<scale halpin="scale-c-out" param_pin="1" halparam="scale-c-in"/>	# scale-c-out-(f|i)	scale-c-in
</pyvcp>
```

Created pins:
```
float OUT	0  test.dial-a-out
float OUT	0  test.dial-b-out
float IN	0  test.dial-c-in
float OUT	0  test.dial-c-out
float OUT	0  test.dial.0.out
float IN	0  test.dial.0.param_pin
float IN	0  test.dial.1.param_pin
float IN	0  test.dial.2.param_pin

float OUT	0  test.spinbox-a-out
float OUT	0  test.spinbox-b-out
float IN	0  test.spinbox-c-in
float OUT	0  test.spinbox-c-out
float OUT	0  test.spinbox.0
float IN	0  test.spinbox.2.param_pin
     
float OUT	0  test.scale-a-out-f
s32   OUT	0  test.scale-a-out-i
float OUT	0  test.scale-b-out-f
s32   OUT	0  test.scale-b-out-i
float IN	0  test.scale-c-in
float OUT	0  test.scale-c-out-f
s32   OUT	0  test.scale-c-out-i
float OUT	0  test.scale.0-f
s32   OUT	0  test.scale.0-i
float IN	0  test.scale.2.param_pin
```
