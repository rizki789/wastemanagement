<?php
  # Copyright (C) Form Follows You - Dennemark - Rudolph - Wannemacher GbR - All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential. Written by Form Follows You, www.formfollowsyou.com, January 2020 

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    #honeypot 
    if(!empty($data['name']) && $data['name'] != ''){
        return;
    }
    else{
        $sender_mail = "gregor.pawlak@formfollowsyou.com";
        #existiert mail und ist mail korrekt?
        if(!empty($data['mail']) && $data['mail'] != '') {
            $mail = $data["mail"];
            if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
                echo "Fehler: Bitte geben Sie Ihre richtige E-Mail Adresse an.";           
                exit;
            }
            #existiert text und enthält text bsr variable, zum vermeiden von spam
            if(!empty($data['text']) && $data['text'] != '') {
                $to = $mail;
                $subject = "BSR Standplatzplaner";
                if(!empty($data['serviceCode']) && $data['serviceCode'] != '') {
                    $subject .= " - Anfragenummer: " . $data['serviceCode'];
                }
                $from = "From: BSR Kundenservice <" . $sender_mail . ">\r\n";
                $from .= "Content-Type: text/html; charset=utf-8\r\n";
                $text = $data['text'];

                if (mail($to, $subject, $text, $from))
                {

                       echo "Mail wurde versandt! Vielen Dank!";
                }
                else
                {
                    echo "Fehler: Mail konnte nicht versandt werden.";
                }
            }else{
                echo "Fehler: Mail-Text konnte nicht erstellt werden.";
            }
        }
        else{
            echo "Fehler: Keine Mail-Adresse angegeben.";
        }
    }
}
else{
    echo "Fehler: Falsche Datenübermittlung.";
}


?>