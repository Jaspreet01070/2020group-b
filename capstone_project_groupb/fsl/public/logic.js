function showPlayers(str){
    if (str !== ""){
        $.ajax({
            url:"/",
            method:"get",
            contentType:"application/json",
            data:JSON.stringify({choice:str}),
            success:function (result){
                $("#txt").html(result.html)
            }
        })
    }
}