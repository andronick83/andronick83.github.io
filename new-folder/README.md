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
