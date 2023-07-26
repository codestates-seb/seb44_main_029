package com.example.server.thumbnailExtractor;

import io.jsonwebtoken.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.jcodec.api.FrameGrab;
import org.jcodec.common.io.NIOUtils;
import org.jcodec.common.model.Picture;
import org.jcodec.scale.AWTUtil;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;

@Slf4j
@Service
public class ThumbnailExtractor {

    private static final String EXTENSION = "jpg";

    public static File extract(File source) throws IOException {
        // 썸네일 파일 생성
        File thumbnail = new File(source.getParent(), source.getName().split("\\.")[0] + "." + EXTENSION);

        try {
            FrameGrab frameGrab = FrameGrab.createFrameGrab(NIOUtils.readableChannel(source));

            // 첫 프레임의 데이터
            frameGrab.seekToSecondPrecise(0);

            Picture picture = frameGrab.getNativeFrame();

            // 썸네일 파일에 복사
            BufferedImage bi = AWTUtil.toBufferedImage(picture);
            ImageIO.write(bi, EXTENSION, thumbnail);

        } catch (Exception e) {
        }

        return thumbnail;
    }
}
