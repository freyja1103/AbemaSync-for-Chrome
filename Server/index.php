<?php
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Origin: https://abema.tv");
    header("Content-Type: application/json");
    if (!file_exists('./currentTime.txt')) {
	    file_put_contents("./currentTime.txt", '{}', LOCK_EX);
    }

    $post = file_get_contents('php://input');
    $dict = json_decode($post, true);
    $pre_data = json_decode(file_get_contents("./currentTime.txt"), true);

    if ($_GET["set"] == true) {
        $pre_data["host"] = $dict["uuid"];
        file_put_contents("./currentTime.txt", json_encode($pre_data));
        echo "ok";
    }else{
        $pre_data["data"][$dict["uuid"]] = $dict;
        if (!isset($pre_data["host"])) {
            $pre_data["host"] = $dict["uuid"];
        }
        file_put_contents("./currentTime.txt", json_encode($pre_data));
        echo json_encode($pre_data["data"][$pre_data["host"]]);
    }
?>
