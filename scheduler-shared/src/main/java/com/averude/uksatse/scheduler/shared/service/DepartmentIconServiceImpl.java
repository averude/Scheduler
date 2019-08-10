package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.DepartmentIcon;
import com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor;
import com.averude.uksatse.scheduler.shared.repository.DepartmentIconRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
public class DepartmentIconServiceImpl
        extends AbstractService<DepartmentIcon, Long> implements DepartmentIconService {
    private final Logger logger = LoggerFactory.getLogger(DepartmentIconService.class);

    private final Path rootLocation = Paths.get("/app/department-icons");

    private final DepartmentIconRepository departmentIconRepository;
    private final TokenExtraDetailsExtractor detailsExtractor;

    public DepartmentIconServiceImpl(DepartmentIconRepository departmentIconRepository,
                                     TokenExtraDetailsExtractor detailsExtractor) {
        super(departmentIconRepository);
        this.departmentIconRepository = departmentIconRepository;
        this.detailsExtractor = detailsExtractor;
    }

    public Optional<DepartmentIcon> getIconByDepartmentId(Long departmentId) {
        return departmentIconRepository.getDepartmentIconByDepartmentId(departmentId);
    }

    @Override
    public DepartmentIcon storeFile(MultipartFile multipartFile) {
        try {
            Path file = this.rootLocation.resolve(multipartFile.getOriginalFilename());
            Files.copy(multipartFile.getInputStream(), file);

            DepartmentIcon departmentIcon = new DepartmentIcon();
            departmentIcon.setFileName(multipartFile.getOriginalFilename());
            return departmentIconRepository.save(departmentIcon);
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            throw new RuntimeException("Unable to save file");
        }
    }

    @Override
    public Resource getFile(Long id) {
        try {
            DepartmentIcon departmentIcon = findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Department Icon with id: " + id + " not found"));

            Path file = rootLocation.resolve(departmentIcon.getFileName());

            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("File " + file.getFileName() + " not found");
            }
        } catch (MalformedURLException | RuntimeException e) {
            logger.error(e.getLocalizedMessage());
            throw new RuntimeException(e.getLocalizedMessage());
        }
    }

    @Override
    public void deleteById(Long id) {
        try {
            DepartmentIcon departmentIcon = findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Department Icon with id: " + id + " not found"));

            Path file = rootLocation.resolve(departmentIcon.getFileName());

            if (file.toFile().delete()) {
                super.deleteById(id);
                logger.debug("File {} was successfully removed", departmentIcon.getFileName());
            } else {
                throw new RuntimeException("Unable to remove file " + departmentIcon.getFileName());
            }
        } catch (RuntimeException e) {
            logger.error(e.getLocalizedMessage());
            throw e;
        }
    }
}
