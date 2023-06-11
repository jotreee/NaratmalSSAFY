package com.ssafy.be.api.controller;


import com.ssafy.be.api.request.DeletePadletReq;
import com.ssafy.be.api.request.RegistPadletReq;
import com.ssafy.be.api.response.GetPadletRes;
import com.ssafy.be.api.response.IsSuccessRes;
import com.ssafy.be.api.service.PadletService;
import com.ssafy.be.common.auth.UserDetail;
import com.ssafy.be.db.entity.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/padlet")
public class PadletController {
    @Autowired
    PadletService padletService;
    private final Logger logger = LogManager.getLogger(PadletController.class);
    @PostMapping()
    public ResponseEntity<IsSuccessRes> registPadlet(@ApiIgnore Authentication authentication, @RequestBody RegistPadletReq req){
        UserDetail userDetail = (UserDetail) authentication.getDetails();
        User user = userDetail.getUser();
        logger.info("registPadlet requestUser: ["+user.getUserEmail()+"] "+" title: ["+req.getTitle()+"]"+"content: ["+req.getContent()+"]");
        IsSuccessRes res= padletService.registPadlet(user, req.getFontSeq(),req.getContent(), req.getTitle(), req.getColor(),req.getLocation());
        return ResponseEntity.status(200).body(res);
    }
    @GetMapping("/{location}")
    public ResponseEntity<GetPadletRes> getPadlet(@PathVariable String location){
        logger.info("getPadlets location: ["+location+"]");
        GetPadletRes res = padletService.getPadlet(location);
        return ResponseEntity.status(200).body(res);
    }
    @DeleteMapping()
    public ResponseEntity<IsSuccessRes> deletePadlet(@RequestBody DeletePadletReq req){
//        @ApiIgnore Authentication auth,
//        UserDetail userDetail = (UserDetail)auth.getDetails();
//        User user = userDetail.getUser();
        logger.info("deletePadlets padletSeq: ["+req.getSeq()+"]");
        IsSuccessRes res = padletService.deletePadlet(req.getSeq());
        return ResponseEntity.status(200).body(res);
    }
}
