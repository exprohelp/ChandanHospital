
function RenderDoctorTemplate(DeptId) {


    <div class="row">
        <%if (dsDocInfo != null && dsDocInfo.Tables.Count > 0)
                    {%>
                <%
                    for (int i = 0; i < dsDocInfo.Tables[0].Rows.Count; i++)
                    {%>
            <div class="card-columns">
                <div class="card" style="border: 2px solid #0ab1b9; padding: 10px 0 0 0; border-radius: 15px; margin-bottom: 5px">
                    <div class="col-md-3">
                        <% if (dsDocInfo.Tables[0].Rows[i]["Photo_Path"].ToString() == "" || dsDocInfo.Tables[0].Rows[i]["Photo_Path"].ToString() == null)
                                {%>
                            <img src="images/demoprofile.jpg" style="width: 150px; height: 150px" />
                            <%}
                        else
                                {%>
                            <img src='<%=dsDocInfo.Tables[0].Rows[i]["Photo_Path"].ToString() %>' style="width: 150px; height: 150px" />
                            <%}%>
                        </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <h5 class="card-title"><%=dsDocInfo.Tables[0].Rows[i]["Doctor_Name"].ToString() %></h5>
                            <p class="card-text"><small class="text-muted"><%=dsDocInfo.Tables[0].Rows[i]["Degree2"].ToString() %></small></p>
                            <hr />
                            <h5 class="card-title"><%=dsDocInfo.Tables[0].Rows[i]["Designation"].ToString() %></h5>
                            <p class="card-text"><%=dsDocInfo.Tables[0].Rows[i]["Head"].ToString() %></p>
                            <span><a href="DoctorProfile.aspx?Id=<%=dsDocInfo.Tables[0].Rows[i][" His_Id"].ToString() %>" class="btn btn-primary btn-sm pull-right">View Profile</a></span>
                        <a href="Appointment.aspx?did=<%=dsDocInfo.Tables[0].Rows[i][" His_Id"].ToString() %>" class="btn btn-primary btn-sm  pull-right">Book Appointment</a>
                    <br />
                </div>
            </div>
                    </div>
                </div>
        <%}%>
                <%}%>
            </div >


}