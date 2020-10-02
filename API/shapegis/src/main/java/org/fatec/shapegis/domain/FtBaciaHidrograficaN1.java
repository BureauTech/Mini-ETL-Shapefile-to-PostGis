package org.fatec.shapegis.domain;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import org.geotools.data.DataStore;
import org.geotools.data.FileDataStore;
import org.geotools.data.FileDataStoreFinder;
import org.geotools.data.Query;
import org.geotools.data.simple.SimpleFeatureSource;
import org.geotools.feature.FeatureCollection;
import org.geotools.feature.FeatureIterator;
import org.opengis.feature.Property;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.Data;

@Data
@RestController
@RequestMapping("/ftbacia")
public class FtBaciaHidrograficaN1 {
	private int bhi_cd;
	private String bhi_cd_otto;
	private Double bhi_ar;
	private String geom;
	private DataStore dataStore;

	@RequestMapping("/colshape")
	// http://localhost:8080/ftbacia/colshape
	private ArrayList<String> getAttibute() throws IOException {
		ArrayList<String> fields = new ArrayList<String>();
		File file = new File(
				"C:\\Users\\Daniel S. Oliveira\\Documents\\AGENCIA_NACIONAL_AGUAS\\geoft_bho_2017_curso_dagua\\geoft_bho_2017_curso_dagua.shp");
		FileDataStore myData = FileDataStoreFinder.getDataStore(file);
		SimpleFeatureSource source = myData.getFeatureSource();
		SimpleFeatureType schema = source.getSchema();

		Query query = new Query(schema.getTypeName());
		query.setMaxFeatures(1);

		FeatureCollection<SimpleFeatureType, SimpleFeature> collection = source.getFeatures(query);
		try (FeatureIterator<SimpleFeature> features = collection.features()) {
			while (features.hasNext()) {
				SimpleFeature feature = features.next();

				for (Property attribute : feature.getProperties()) {
					fields.add(attribute.getName().toString());
				}
			}
		}
		return fields;
	}
	
	@SuppressWarnings("unused")
	private void getValue() throws IOException {
		File file = new File(
				"C:\\Users\\Daniel S. Oliveira\\Documents\\AGENCIA_NACIONAL_AGUAS\\geoft_bho_2017_curso_dagua\\geoft_bho_2017_curso_dagua.shp");
		FileDataStore myData = FileDataStoreFinder.getDataStore(file);
		SimpleFeatureSource source = myData.getFeatureSource();
		SimpleFeatureType schema = source.getSchema();

		Query query = new Query(schema.getTypeName());

		FeatureCollection<SimpleFeatureType, SimpleFeature> collection = source.getFeatures(query);
		try (FeatureIterator<SimpleFeature> features = collection.features()) {
			int cont = 0;
			while (features.hasNext()) {
				SimpleFeature feature = features.next();
				for (Property attribute : feature.getProperties()) {

					System.out.println("\t" + attribute.getName() + ":" + attribute.getValue());

				}
				System.out.println(cont++);
			}
		}
	}
}