import { Component,h, State } from "@stencil/core";

@Component({
    tag:'user-data',
    styleUrl:'./user-data.css',
    shadow:true
})
export class UserData{

    
    @State() formControls = {
        first_name: null,
        last_name: null,
        email: null,
        mobile_no: null,
        gender:null,
        maritial_status:null,
        lang:[]
    };
    

    handleSubmit(e){
        e.preventDefault();
        console.log(this.formControls);        
    }

    changeFormValue(controlName, value) {
        //alert(this.formControls[controlName])
        
            this.formControls = {
            ...this.formControls,
            [controlName]: value
        };
    }
    componentDidLoad(){
        console.log('componentDidLoad');
                
        fetch(`https://reqres.in/api/users/2`)
        .then(res=>{
            return res.json();
        })
        .then(parseRes=>{
            let result = parseRes.data;
            console.log(result);
            this.changeFormValue('first_name',result.first_name);
            this.changeFormValue('last_name',result.last_name);
            this.changeFormValue('email',result.email);
                                     
        })
        .catch(err=>{
            console.log(err);
            
        })
    }

    render(){
        return <form onSubmit={(e) => this.handleSubmit(e)}>
                    <table cellPadding="5" cellSpacing="5">
                        <tr>
                            <td>First Name* : </td>
                            <td><input type="text" value={this.formControls['first_name']} 
                            name="first_name" 
                           
                            onInput={(ev: any) =>this.changeFormValue("first_name",ev.target.value)}
                            />
                            { this.formControls['first_name'] ? '': <span>Please enter first name</span>} 
                            
                            </td>
                        </tr>
                        <tr>
                            <td>Last Name* : </td>
                            <td><input type="text" name="last_name" 
                            value={this.formControls['last_name']}
                            placeholder="Last name" 
                            onInput={(ev: any) =>this.changeFormValue("last_name",ev.target.value)}
                            />
                            { this.formControls['last_name'] ? '': <span>Please enter last name</span>} 
                            </td>
                        </tr>
                        <tr>
                            <td>Mobile No* : </td>
                            <td><input type="text" name="mobile_no" 
                            placeholder="Mobile number" 
                            value={this.formControls['mobile_no']}
                            onInput={(ev: any) =>this.changeFormValue("mobile_no",ev.target.value)}
                            /></td>
                        </tr>
                        <tr>
                            <td>Email* :</td>
                            <td><input type="text" name="email" 
                             placeholder="Email" 
                             value={this.formControls['email']}
                             onInput={(ev: any) =>this.changeFormValue("email",ev.target.value)}
                            />
                            { this.formControls['email'] ? '': <span>Please enter email</span>} 
                            </td>
                        </tr>
                        <tr>
                            <td>Gender* : </td>
                            <td>
                                <select name="gender" onInput={(ev: any) =>this.changeFormValue("gender",ev.target.value)}>
                                    <option value="0">Select Gender</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="T">Other</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Maritial Status* :  </td>
                            <td>
                                <input type="radio" onInput={(ev: any) =>this.changeFormValue("maritial_status",ev.target.value)}  name="maritial_status" value="married" />&nbsp;Married
                                <input type="radio" name="maritial_status" onInput={(ev: any) =>this.changeFormValue("maritial_status",ev.target.value)}  value="Unmarried" />&nbsp;Unmarried
                            </td>
                        </tr>
                        <tr>
                            <td>Language* : </td>
                            <td>
                                <input type="checkbox" onInput={(ev: any) =>this.changeFormValue("lang[]",ev.target.value)} name="lang[]" value="en"/>&nbsp;English <br/>                       
                                <input type="checkbox" onInput={(ev: any) =>this.changeFormValue("lang[]",ev.target.value)} name="lang[]" value="fr"/>&nbsp;French <br/>
                                <input type="checkbox" onInput={(ev: any) =>this.changeFormValue("lang[]",ev.target.value)} name="lang[]" value="sp"/>&nbsp;Spanish
                            </td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>
                                <input type="submit" value="Submit" />&nbsp;
                                <input type="reset" value="Clear" />
                            </td>
                        </tr>
                    </table>
                                  
                                  
                </form>
        
    }
}